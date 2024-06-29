import { Field, InputType, Int } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field(() => Int)
  restaurantId: number;

  @Field(() => Int)
  rating: number;

  @Field()
  @Length(10, 200)
  feedback: string;
}
