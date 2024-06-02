import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { ReviewType } from './review.type';
import { ReviewService } from 'review/review.service';
import { CreateReviewInput } from './create-review.input';
import { RestaurantService } from 'restaurant/restaurant.service';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { errorCodes } from 'constants/error-codes';

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
    try {
      const { restaurantId, ...reviewInput } = input;
      const restaurant = await this.restaurantService.findById(restaurantId);

      if (!restaurantId) {
        throw new NotFoundException(`Restaurant ${restaurantId} is not found`);
      }

      const review = await this.reviewService.createReview(
        reviewInput,
        restaurant,
        request.user,
      );

      return review;
    } catch (error) {
      if (error?.code === errorCodes.DUPLICATE_RECORD) {
        return new UnprocessableEntityException(
          `A user ${request.user.id} have already left review for restaurant ${input.restaurantId}`,
        );
      }

      throw new InternalServerErrorException();
    }
  }
}
