import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginatedUsers, UserType } from './user.type';
import { UserService } from '../user.service';
import { RestaurantService } from 'restaurant/restaurant.service';
import { RestaurantType } from 'restaurant/api/restaurant.type';
import { ReservationType } from 'reservation/api/reservation.type';
import { ReservationService } from 'reservation/reservation.service';
import { PaginationInput } from 'pagination/api/pagination.input';

@Resolver(() => UserType)
export class UserQuery {
  constructor(
    private userService: UserService,
    private restaurantService: RestaurantService,
    private reservationService: ReservationService,
  ) {}

  @Query(() => PaginatedUsers)
  findAllUsers(@Args('paginationInput') input: PaginationInput) {
    return this.userService.findAllUsers(input);
  }

  @ResolveField('restaurants', () => [RestaurantType])
  restaurants(@Parent() user: UserType) {
    return this.restaurantService.findUserRestaurants(user.id);
  }

  @ResolveField('reservations', () => [ReservationType])
  reservations(@Parent() user: UserType) {
    return this.reservationService.findUserReservations(user.id);
  }
}
