import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'constants/is-public.decorator';
import { AuthService } from 'auth/auth.service';
import { UserType } from 'user/api/user.type';
import { RegisterUserInput } from './register-user.input';
import { LoginSuccessType } from './login-success.type';
import { LoginUserInput } from './login.input';

@Resolver(() => UserType)
export class AuthMutations {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => UserType)
  registerUser(@Args('registerUserInput') createUserInput: RegisterUserInput) {
    return this.authService.registerUser(createUserInput);
  }

  @Public()
  @Mutation(() => LoginSuccessType)
  async loginUser(@Args('loginInput') loginInput: LoginUserInput) {
    return this.authService.loginUser(loginInput);
  }
}
