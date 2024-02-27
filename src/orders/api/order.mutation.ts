import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderType } from 'orders/api/order.type';
import { CreateOrderInput } from './create-order.input';
import { OrderService } from 'orders/order.service';
import { UserService } from 'user/user.service';
import { RestaurantService } from 'restaurant/restaurant.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => OrderType)
export class OrderMutations {
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private restaurantService: RestaurantService,
  ) {}

  @Mutation(() => OrderType)
  async createOrder(@Args('createOrderInput') input: CreateOrderInput) {
    const { userId, restaurantId, orderDate } = input;

    const restaurant =
      await this.restaurantService.findRestaurantById(restaurantId);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${restaurantId} isn't found`);
    }

    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(`User ${userId} isn't found`);
    }

    return this.orderService.createOrder(restaurant, user, orderDate);
  }

  // async approveOrder(@Args('orderId', { type: () => ID }) orderId: number) {
  //   const restaurant =
  //     await this.restaurantService.findRestaurantById(restaurantId);

  //   if (!restaurant) {
  //     throw new NotFoundException(`Restaurant ${restaurantId} isn't found`);
  //   }
  // }
}
