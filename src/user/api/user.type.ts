import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RestaurantType } from 'restaurant/api/restaurant.type';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => [RestaurantType])
  restaurants: RestaurantType[];
}
