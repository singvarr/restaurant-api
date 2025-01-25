import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { PaginatedResponse } from 'pagination/api/paginated-entity.type';
import { RestaurantType } from 'restaurant/api/restaurant.type';
import { UserType } from 'user/api/user.type';

@ObjectType()
export class ReviewType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  rating: number;

  @Field()
  @Length(10, 200)
  feedback: string;

  @Field(() => UserType)
  author: UserType;

  @Field(() => RestaurantType)
  restaurant: RestaurantType;

  @Field(() => String)
  createdAt: string;
}

@ObjectType()
export class PaginatedReviews extends PaginatedResponse(ReviewType) {}
