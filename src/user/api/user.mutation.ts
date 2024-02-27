import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteResult } from 'common/delete-result';
import { UserType } from './user.type';
import { CreateUserInput } from './create-user.input';
import { UserService } from '../user.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './update-user.input';

@Resolver(() => UserType)
export class UserMutations {
  constructor(private userService: UserService) {}

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => DeleteResult)
  async deleteUser(@Args('userId', { type: () => ID }) userId: number) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(`User ${userId} isn't found`);
    }

    return this.userService.deleteUserById(userId);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('userId', { type: () => ID }) userId: number,
    @Args('body', { type: () => UpdateUserInput }) body: UpdateUserInput,
  ) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(`User ${userId} isn't found`);
    }

    return this.userService.updateUser(user, body);
  }
}
