import { Field, InputType, ID } from '@nestjs/graphql';
import { IsDate, MinDate } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  userId: number;

  @Field(() => ID)
  restaurantId: number;

  @Field()
  @IsDate()
  @MinDate(() => new Date())
  orderDate: Date;
}
