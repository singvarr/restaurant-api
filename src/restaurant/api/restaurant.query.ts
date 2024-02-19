import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { RestaurantType } from './restaurant.type';
import { RestaurantService } from '../restaurant.service';
import { UserType } from 'user/api/user.type';
import { UserService } from 'user/user.service';

@Resolver(() => RestaurantType)
export class RestaurantResolver {
  constructor(
    private restaurantService: RestaurantService,
    private userService: UserService,
  ) {}

  @Query(() => [RestaurantType])
  async findAllRestaurants() {
    return this.restaurantService.findAll();
  }

  @Query(() => RestaurantType, { nullable: true })
  async findByName(
    @Args('name', { type: () => String }) name: string,
  ): Promise<RestaurantType | undefined> {
    return this.restaurantService.findByName(name);
  }

  @ResolveField('owner', () => UserType, { nullable: true })
  async owner(@Parent() user: UserType) {
    return this.userService.findUserById(user.id);
  }
}
