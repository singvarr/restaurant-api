import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from 'orders/order-status.enum';

@ObjectType()
export class OrderType {
  @Field(() => Int)
  id: number;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => Date)
  orderDate: Date;
}
