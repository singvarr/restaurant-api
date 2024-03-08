import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenError, AuthenticationError } from '@nestjs/apollo';
import { compare, hash } from 'bcrypt';
import { RegisterUserInput } from './api/register-user.input';
import { UserService } from 'user/user.service';
import { LoginUserInput } from './api/login.input';
import { TokenPayload } from './constants/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  private static readonly SALT_ROUNDS = 10;
  private static readonly ACCESS_TOKEN_TTL = '15m';

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

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: AuthService.ACCESS_TOKEN_TTL,
    });

    return { accessToken: token };
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const result = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      return result;
    } catch (_) {
      return false;
    }
  }
}
