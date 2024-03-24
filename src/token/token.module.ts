import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistAccessToken } from './entities/blacklist-access-token.entity';
import { BlacklistRefreshToken } from './entities/blacklist-refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';
import { AccessTokenService } from './access-token.service';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([BlacklistAccessToken, BlacklistRefreshToken]),
    UserModule,
  ],
  providers: [RefreshTokenService, AccessTokenService],
  exports: [RefreshTokenService, AccessTokenService],
})
export class TokenModule {}
