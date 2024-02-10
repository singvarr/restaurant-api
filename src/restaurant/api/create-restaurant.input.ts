import { InputType, Field } from '@nestjs/graphql';
import { CuisineType } from '../cuisine-type.enum';

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field(() => CuisineType)
  cuisineType: CuisineType;
}
