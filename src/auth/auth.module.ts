import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'user/user.module';
import { AuthService } from './auth.service';
import { AuthMutations } from './api/auth.mutation';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [
    AuthService,
    AuthMutations,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [UserModule, JwtModule],
})
export class AuthModule {}
