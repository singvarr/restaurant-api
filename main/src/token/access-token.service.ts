import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlacklistAccessToken } from './entities/blacklist-access-token.entity';
import { TokenService } from './token.service';
import { UserService } from 'user/user.service';

@Injectable()
export class AccessTokenService extends TokenService {
  static SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
  static TOKEN_TTL = '15m';

  constructor(
    @InjectRepository(BlacklistAccessToken)
    blacklistTokenRepository: Repository<BlacklistAccessToken>,
    jwtService: JwtService,
    userService: UserService,
  ) {
    super(
      jwtService,
      blacklistTokenRepository,
      AccessTokenService.SECRET_KEY,
      AccessTokenService.TOKEN_TTL,
      userService,
    );
  }
}
