import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { ReviewType } from './review.type';
import { ReviewService } from 'review/review.service';
import { CreateReviewInput } from './create-review.input';
import { RestaurantService } from 'restaurant/restaurant.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => ReviewType)
export class ReviewMutations {
  constructor(
    private reviewService: ReviewService,
    private restaurantService: RestaurantService,
  ) {}

  @Mutation(() => ReviewType)
  async createReview(
    @Args('createReviewInput') input: CreateReviewInput,
    @Context('req') request: Request,
  ) {
    const { restaurantId, ...reviewInput } = input;
    const restaurant =
      await this.restaurantService.findRestaurantById(restaurantId);

    if (!restaurantId) {
      throw new NotFoundException(`Restaurant ${restaurantId} is not found`);
    }

    return this.reviewService.createReview(
      reviewInput,
      restaurant,
      request.user,
    );
  }
}
