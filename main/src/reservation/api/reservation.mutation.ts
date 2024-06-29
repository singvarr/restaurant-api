import { Args, Context, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { Inject, NotFoundException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { ReservationType } from 'reservation/api/reservation.type';
import { CreateReservationInput } from './create-reservation.input';
import { ReservationService } from 'reservation/reservation.service';
import { UserService } from 'user/user.service';
import { RestaurantService } from 'restaurant/restaurant.service';
import { ReservationStatus } from 'reservation/reservation-status.enum';
import { ReservationEvents } from './reservation-event';
import { PUB_SUB } from 'constants/pubsub-inject-token';

@Resolver(() => ReservationType)
export class ReservationMutations {
  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private restaurantService: RestaurantService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Mutation(() => ReservationType)
  async createReservation(
    @Args('createReservationInput') input: CreateReservationInput,
  ) {
    const { userId, restaurantId, reservationDate } = input;

    const restaurant = await this.restaurantService.findById(restaurantId);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${restaurantId} isn't found`);
    }

    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException(`User ${userId} isn't found`);
    }

    const newReservation = await this.reservationService.createReservation(
      restaurant,
      user,
      reservationDate,
    );

    this.pubSub.publish(ReservationEvents.RESERVATION_CREATED, {
      addedReservation: newReservation,
    });

    return newReservation;
  }

  @Mutation(() => ReservationType)
  async reviewReservation(
    @Args('reservationId', { type: () => ID }) reservationId: number,
    @Args('status', { type: () => ReservationStatus })
    status: ReservationStatus,
    @Context('req') request: Request,
  ) {
    const reservation = await this.reservationService.findById(reservationId);

    if (!reservation) {
      throw new NotFoundException(`Reservation ${reservationId} isn't found`);
    }

    const reviewedReservation = await this.reservationService.reviewReservation(
      reservation,
      status,
    );

    this.pubSub.publish(ReservationEvents.RESERVATION_REVIEWED, {
      reviewedReservation,
      user: request.user,
    });

    return reviewedReservation;
  }
}
