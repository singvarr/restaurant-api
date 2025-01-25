import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from 'restaurant/restaurant.entity';
import { User } from 'user/user.entity';
import { PaginationService } from 'pagination/pagination.service';
import { Review } from './review.entity';
import { CreateReviewInput } from './api/create-review.input';
import { PaginatedReviews } from './api/review.type';
import { ReviewPaginationInput } from './api/review-pagination.input';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private paginationService: PaginationService<Review>,
  ) {}

  createReview(
    reviewDetails: Omit<CreateReviewInput, 'restaurantId'>,
    restaurant: Restaurant,
    user: User,
  ) {
    const review = this.reviewRepository.create({
      author: user,
      restaurant,
      ...reviewDetails,
    });

    return this.reviewRepository.save(review);
  }

  async findAllByRestaurant(
    input: ReviewPaginationInput,
    restaurant: Restaurant,
  ): Promise<PaginatedReviews> {
    const query = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.restaurantId = :restaurantId', {
        restaurantId: restaurant.id,
      })
      .leftJoinAndSelect('review.author', 'author')
      .leftJoinAndSelect('review.restaurant', 'restaurant');

    return this.paginationService.paginate(query, input, 'review.id');
  }
}
