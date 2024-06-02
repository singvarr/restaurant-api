import { Resolver, Query, Args } from '@nestjs/graphql';
import { PaginatedReviews, ReviewType } from './review.type';
import { ReviewService } from 'review/review.service';
import { Public } from 'constants/is-public.decorator';
import { PaginationInput } from 'pagination/api/pagination.input';

@Resolver(() => ReviewType)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Public()
  @Query(() => PaginatedReviews)
  findAllReviews(@Args('paginationInput') input: PaginationInput) {
    return this.reviewService.findAll(input);
  }
}
