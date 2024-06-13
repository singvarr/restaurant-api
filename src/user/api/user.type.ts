import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginatedResponse } from 'pagination/api/paginated-entity.type';

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

  @Field(() => Int)
  reservationCount: number;
}

@ObjectType()
export class PaginatedUsers extends PaginatedResponse(UserType) {}
