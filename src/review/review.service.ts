import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { Restaurant } from 'restaurant/restaurant.entity';
import { User } from 'user/user.entity';
import { PaginationService } from 'pagination/pagination.service';
import { Review } from './review.entity';
import { CreateReviewInput } from './api/create-review.input';
import { PaginatedReviews } from './api/review.type';
import { ReviewPaginationInput } from './api/review-pagination.input';
import { TokenPayload } from 'token/token-payload.interface';
import { EditReviewInput } from './api/edit-review.input';

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

  async findById(id: number, options: FindOneOptions<Review> = {}) {
    return this.reviewRepository.findOne({ where: { id }, ...options });
  }

  async deleteReview(id: number) {
    const { affected } = await this.reviewRepository.delete(id);

    return { affected };
  }

  async editReview(review: Review, data: EditReviewInput) {
    await this.reviewRepository.update(review.id, data);

    return this.findById(review.id, { relations: ['author', 'restaurant'] });
  }

  isOwner(review: Review, tokenPayload: TokenPayload): Promise<boolean> {
    return this.reviewRepository.existsBy({
      id: review.id,
      author: { id: tokenPayload.id },
    });
  }
}
