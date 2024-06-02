import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Inject, NotFoundException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { OrderType } from 'order/api/order.type';
import { CreateOrderInput } from './create-order.input';
import { OrderService } from 'order/order.service';
import { UserService } from 'user/user.service';
import { RestaurantService } from 'restaurant/restaurant.service';
import { OrderStatus } from 'order/order-status.enum';
import { OrderEvents } from './order-event.enum';
import { PUB_SUB } from 'constants/pubsub-inject-token';

@Resolver(() => OrderType)
export class OrderMutations {
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private restaurantService: RestaurantService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Mutation(() => OrderType)
  async createOrder(@Args('createOrderInput') input: CreateOrderInput) {
    const { userId, restaurantId, orderDate } = input;

    const restaurant = await this.restaurantService.findById(restaurantId);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${restaurantId} isn't found`);
    }

    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(`User ${userId} isn't found`);
    }

    const newOrder = await this.orderService.createOrder(
      restaurant,
      user,
      orderDate,
    );

    this.pubSub.publish(OrderEvents.ORDER_CREATED, { addedOrder: newOrder });

    return newOrder;
  }

  @Mutation(() => OrderType)
  async reviewOrder(
    @Args('orderId', { type: () => ID }) orderId: number,
    @Args('status', { type: () => OrderStatus }) status: OrderStatus,
  ) {
    const order = await this.orderService.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Order ${orderId} isn't found`);
    }

    return this.orderService.reviewOrder(order, status);
  }
}
