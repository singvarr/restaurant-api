import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CuisineType } from '../cuisine-type.enum';

@ObjectType()
export class RestaurantType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => CuisineType)
  cuisineType: CuisineType;
}
