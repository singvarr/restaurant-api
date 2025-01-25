import { Args, Context, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { OrGuard } from '@nest-lab/or-guard';
import { Roles } from 'auth/roles.enum';
import { Role } from 'constants/roles.decorator';
import { ReviewOwnerGuard } from 'review/review-owner.guard';
import { EditReviewInput } from './edit-review.input';
import { RolesGuard } from 'auth/guards/roles.guard';
import { ReviewType } from './review.type';
import { ReviewService } from 'review/review.service';
import { CreateReviewInput } from './create-review.input';
import { RestaurantService } from 'restaurant/restaurant.service';
import { errorCodes } from 'constants/error-codes';
import { DeleteResult } from 'common/delete-result';

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

  @Role(Roles.SUPERADMIN)
  @UseGuards(OrGuard([RolesGuard, ReviewOwnerGuard]))
  @Mutation(() => ReviewType)
  async editReview(
    @Args('reviewId', { type: () => ID }) reviewId: number,
    @Args('body', { type: () => EditReviewInput }) body: EditReviewInput,
  ) {
    const review = await this.reviewService.findById(reviewId);

    if (!review) {
      throw new NotFoundException(`Review ${reviewId} isn't found`);
    }

    return this.reviewService.editReview(review, body);
  }

  @Role(Roles.SUPERADMIN)
  @UseGuards(OrGuard([RolesGuard, ReviewOwnerGuard]))
  @Mutation(() => DeleteResult)
  async deleteReview(@Args('id', { type: () => ID }) id: number) {
    return this.reviewService.deleteReview(id);
  }
}
