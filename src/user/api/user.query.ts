import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginatedUsers, UserType } from './user.type';
import { UserService } from '../user.service';
import { RestaurantService } from 'restaurant/restaurant.service';
import { RestaurantType } from 'restaurant/api/restaurant.type';
import { OrderType } from 'order/api/order.type';
import { OrderService } from 'order/order.service';
import { PaginationInput } from 'pagination/api/pagination.input';

@Resolver(() => UserType)
export class UserQuery {
  constructor(
    private userService: UserService,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
  ) {}

  @Query(() => PaginatedUsers)
  findAllUsers(@Args('paginationInput') input: PaginationInput) {
    return this.userService.findAllUsers(input);
  }

  @ResolveField('restaurants', () => [RestaurantType])
  restaurants(@Parent() user: UserType) {
    return this.restaurantService.findUserRestaurants(user.id);
  }

  @ResolveField('orders', () => [OrderType])
  orders(@Parent() user: UserType) {
    return this.orderService.findUserOrders(user.id);
  }
}
