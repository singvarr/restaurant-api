import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'user/user.entity';
import { TokenPayload } from './token-payload.interface';
import { UserService } from 'user/user.service';
import { BlacklistToken } from './entities/blacklist-token.entity';

export abstract class TokenService {
  constructor(
    private jwtService: JwtService,
    private repository: Repository<BlacklistToken>,
    private secretKey: string,
    private tokenTtl: string,
    private userService: UserService,
  ) {
    this.jwtService = jwtService;
    this.repository = repository;
    this.secretKey = secretKey;
    this.tokenTtl = tokenTtl;
    this.userService = userService;
  }

  generate(user: User) {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.secretKey,
      expiresIn: this.tokenTtl,
    });
  }

  getUserFromToken(token: string) {
    const { id } = this.jwtService.decode<TokenPayload>(token);
    return this.userService.findUserById(id);
  }

  isBlackListed(token: string) {
    return this.repository.existsBy({ value: token });
  }

  async verify(token: string): Promise<TokenPayload> {
    const isTokenBlackListed = await this.isBlackListed(token);

    if (isTokenBlackListed) {
      throw new Error('Token is blacklisted');
    }

    return this.jwtService.verifyAsync<TokenPayload>(token, {
      secret: this.secretKey,
    });
  }

  async blacklist(token: string) {
    const user = await this.getUserFromToken(token);

    if (!user) {
      throw new Error('User not found');
    }

    const blacklistedToken = this.repository.create({ value: token, user });

    return this.repository.save(blacklistedToken);
  }
}
