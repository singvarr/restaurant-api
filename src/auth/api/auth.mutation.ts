import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { Public } from 'constants/is-public.decorator';
import { AuthService } from 'auth/auth.service';
import { AuthGuard } from 'auth/guards/auth.guard';
import { UserType } from 'user/api/user.type';
import { SuccessResult } from 'common/success-result';
import { RegisterUserInput } from './register-user.input';
import { LoginUserInput } from './login.input';
import { AuthSuccessType } from './auth-success.type';

@Resolver(() => UserType)
export class AuthMutations {
  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard,
  ) {}

  @Public()
  @Mutation(() => UserType)
  registerUser(@Args('registerUserInput') createUserInput: RegisterUserInput) {
    return this.authService.registerUser(createUserInput);
  }

  @Public()
  @Mutation(() => AuthSuccessType)
  loginUser(@Args('loginInput') loginInput: LoginUserInput) {
    return this.authService.loginUser(loginInput);
  }

  @Mutation(() => SuccessResult)
  async logoutUser(@Context('req') request: Request) {
    const token = this.authGuard.getTokenFromHeader(request);

    await this.authService.logoutUser(token);

    return { success: 'ok!' };
  }

  @Public()
  @Mutation(() => AuthSuccessType)
  refreshToken(@Args('token', { type: () => String }) token: string) {
    return this.authService.refreshToken(token);
  }
}
