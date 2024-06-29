import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReservationStatus } from 'reservation/reservation-status.enum';
import { RestaurantType } from 'restaurant/api/restaurant.type';

@ObjectType()
export class ReservationType {
  @Field(() => Int)
  id: number;

  @Field(() => ReservationStatus)
  status: ReservationStatus;

  // TODO: write custom scalar for date only field
  @Field(() => String)
  reservationDate: string;

  @Field(() => RestaurantType)
  restaurant: RestaurantType;
}
