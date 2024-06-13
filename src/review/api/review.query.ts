import { Resolver, Query, Args } from '@nestjs/graphql';
import { PaginatedReviews, ReviewType } from './review.type';
import { ReviewService } from 'review/review.service';
import { Public } from 'constants/is-public.decorator';
import { RestaurantService } from 'restaurant/restaurant.service';
import { NotFoundException } from '@nestjs/common';
import { ReviewPaginationInput } from './review-pagination.input';

@Resolver(() => ReviewType)
export class ReviewResolver {
  constructor(
    private reviewService: ReviewService,
    private restaurantService: RestaurantService,
  ) {}

  @Public()
  @Query(() => PaginatedReviews)
  async findAllRestaurantReviews(
    @Args('restaurantName') restaurantName: string,
    @Args('input') input: ReviewPaginationInput,
  ) {
    const restaurant = await this.restaurantService.findByName(restaurantName);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${restaurantName} is not found`);
    }

    return this.reviewService.findAllByRestaurant(input, restaurant);
  }
}
