import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { CreateUserInput } from './create-user.input';
import { UserService } from '../user.service';

@Resolver(() => UserType)
export class UserMutations {
  constructor(private userService: UserService) {}

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }
}
