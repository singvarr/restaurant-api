import { Args, ID, Resolver, Subscription } from '@nestjs/graphql';
import { OrderType } from 'order/api/order.type';
import { Inject, NotFoundException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'constants/pubsub-inject-token';
import { OrderEvents } from './order-event.enum';
import { RestaurantService } from 'restaurant/restaurant.service';

@Resolver(() => OrderType)
export class OrderSubscriptions {
  constructor(
    private restaurantService: RestaurantService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Subscription(() => OrderType, {
    filter: (payload, { restaurantId }) =>
      !restaurantId ||
      payload.addedOrder.restaurant.id === Number(restaurantId),
  })
  async addedOrder(
    @Args('restaurantId', { type: () => ID, nullable: true })
    restaurantId: number | null = null,
  ) {
    if (restaurantId) {
      const restaurant = await this.restaurantService.findById(restaurantId);

      if (!restaurant) {
        throw new NotFoundException(`Restaurant ${restaurantId} doesn't exist`);
      }
    }

    return this.pubSub.asyncIterator(OrderEvents.ORDER_CREATED);
  }
}
