import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from '../user.service';
import { Restaurant } from 'restaurant/restaurant.entity';
import { RestaurantService } from 'restaurant/restaurant.service';

@Resolver(() => UserType)
export class UserQuery {
  constructor(
    private userService: UserService,
    private restaurantService: RestaurantService,
  ) {}

  @Query(() => [UserType])
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @ResolveField('restaurants', () => [Restaurant])
  async restaurants(@Parent() user: UserType) {
    return this.restaurantService.findUserRestaurants(user);
  }
}
