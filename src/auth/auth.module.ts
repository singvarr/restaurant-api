import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'user/user.module';
import { AuthService } from './auth.service';
import { AuthMutations } from './api/auth.mutation';

@Module({
  providers: [AuthService, AuthMutations],
  imports: [UserModule, JwtModule],
})
export class AuthModule {}
