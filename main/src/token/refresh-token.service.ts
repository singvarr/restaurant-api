import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from './token.service';
import { BlacklistRefreshToken } from './entities/blacklist-refresh-token.entity';
import { UserService } from 'user/user.service';

@Injectable()
export class RefreshTokenService extends TokenService {
  static SECRET_KEY = process.env.REFRESH_TOKEN_SECRET;
  static TOKEN_TTL = '8h';

  constructor(
    @InjectRepository(BlacklistRefreshToken)
    blacklistTokenRepository: Repository<BlacklistRefreshToken>,
    userService: UserService,
    jwtService: JwtService,
  ) {
    super(
      jwtService,
      blacklistTokenRepository,
      RefreshTokenService.SECRET_KEY,
      RefreshTokenService.TOKEN_TTL,
      userService,
    );
  }
}
