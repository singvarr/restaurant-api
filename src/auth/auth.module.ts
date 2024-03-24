import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'user/user.module';
import { TokenModule } from 'token/token.module';
import { AuthService } from './auth.service';
import { AuthMutations } from './api/auth.mutation';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [
    AuthService,
    AuthMutations,
    AuthGuard,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [UserModule, TokenModule],
})
export class AuthModule {}
