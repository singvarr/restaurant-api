import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from '../user.service';
import { RestaurantService } from 'restaurant/restaurant.service';
import { RestaurantType } from 'restaurant/api/restaurant.type';
import { OrderType } from 'orders/api/order.type';
import { OrderService } from 'orders/order.service';

@Resolver(() => UserType)
export class UserQuery {
  constructor(
    private userService: UserService,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
  ) {}

  @Query(() => [UserType])
  findAllUsers() {
    return this.userService.findAllUsers();
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
