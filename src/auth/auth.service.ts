import { Injectable } from '@nestjs/common';
import { ForbiddenError, AuthenticationError } from '@nestjs/apollo';
import { compare, hash } from 'bcrypt';
import { RegisterUserInput } from './api/register-user.input';
import { UserService } from 'user/user.service';
import { LoginUserInput } from './api/login.input';
import { AccessTokenService } from 'token/access-token.service';
import { RefreshTokenService } from 'token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  private static readonly SALT_ROUNDS = 10;

  async registerUser(input: RegisterUserInput) {
    const user = await this.userService.findUserByEmail(input.email);

    if (user) {
      throw new ForbiddenError('Already registered');
    }

    const { password, ...rest } = input;
    const hashedPassword = await hash(password, AuthService.SALT_ROUNDS);

    return this.userService.createUser({ ...rest, password: hashedPassword });
  }

  async loginUser(input: LoginUserInput) {
    const user = await this.userService.findUserByEmail(input.email);

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const { password } = input;

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    const accessToken = await this.accessTokenService.generate(user);
    const refreshToken = await this.refreshTokenService.generate(user);

    return { accessToken, refreshToken };
  }

  async logoutUser(token: string) {
    const isValidToken = await this.accessTokenService.verify(token);

    if (!isValidToken) {
      throw new AuthenticationError('Failed to log out');
    }

    const isBlacklisted = await this.accessTokenService.isBlackListed(token);

    if (isBlacklisted) {
      throw new AuthenticationError('Failed to log out');
    }

    await this.accessTokenService.blacklist(token);
  }

  async refreshToken(token: string) {
    try {
      await this.refreshTokenService.verify(token);
      await this.refreshTokenService.blacklist(token);

      const user = await this.refreshTokenService.getUserFromToken(token);

      const [accessToken, refreshToken] = await Promise.all([
        this.accessTokenService.generate(user),
        this.refreshTokenService.generate(user),
      ]);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new AuthenticationError('Failed to refresh token');
    }
  }
}
