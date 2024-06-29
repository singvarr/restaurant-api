import { Args, ID, Resolver, Subscription } from '@nestjs/graphql';
import { Inject, NotFoundException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'constants/pubsub-inject-token';
import { ReservationType } from 'reservation/api/reservation.type';
import { ReservationEvents } from 'reservation/api/reservation-event';
import { RestaurantService } from 'restaurant/restaurant.service';
import { Public } from 'constants/is-public.decorator';

@Resolver(() => ReservationType)
export class ReservationSubscriptions {
  constructor(
    private restaurantService: RestaurantService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Public()
  @Subscription(() => ReservationType, {
    filter: (payload, { restaurantId }) =>
      !restaurantId ||
      payload.addedReservation.restaurant.id === Number(restaurantId),
  })
  async addedReservation(
    @Args('restaurantId', { type: () => ID, nullable: true })
    restaurantId: number | null = null,
  ) {
    if (restaurantId) {
      const restaurant = await this.restaurantService.findById(restaurantId);

      if (!restaurant) {
        throw new NotFoundException(`Restaurant ${restaurantId} doesn't exist`);
      }
    }

    return this.pubSub.asyncIterator(ReservationEvents.RESERVATION_CREATED);
  }

  @Subscription(() => ReservationType, {
    filter: ({ user }, _, { req }) => user.id === req.user.id,
  })
  async reviewedReservation() {
    return this.pubSub.asyncIterator(ReservationEvents.RESERVATION_REVIEWED);
  }
}
