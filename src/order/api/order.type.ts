import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from 'order/order-status.enum';

@ObjectType()
export class OrderType {
  @Field(() => Int)
  id: number;

  @Field(() => OrderStatus)
  status: OrderStatus;

  // TODO: write custom scalar for date only field
  @Field(() => String)
  orderDate: string;
}
