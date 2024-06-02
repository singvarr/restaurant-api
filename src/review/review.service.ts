import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from 'restaurant/restaurant.entity';
import { User } from 'user/user.entity';
import { PaginationService } from 'pagination/pagination.service';
import { PaginationInput } from 'pagination/api/pagination.input';
import { errorCodes } from 'constants/error-codes';
import { Review } from './review.entity';
import { CreateReviewInput } from './api/create-review.input';
import { PaginatedReviews } from './api/review.type';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private paginationService: PaginationService<Review>,
  ) {}

  async createReview(
    reviewDetails: Omit<CreateReviewInput, 'restaurantId'>,
    restaurant: Restaurant,
    user: User,
  ) {
    try {
      const review = this.reviewRepository.create({
        author: user,
        restaurant,
        ...reviewDetails,
      });

      const savedReview = await this.reviewRepository.save(review);

      return savedReview;
    } catch (error) {
      if (error?.code === errorCodes.DUPLICATE_RECORD) {
        return new UnprocessableEntityException(
          `A user ${user.id} have already left review for restaurant ${restaurant.id}`,
        );
      }

      throw new InternalServerErrorException();
    }
  }

  async findAllByRestaurant(
    input: PaginationInput,
    restaurant: Restaurant,
  ): Promise<PaginatedReviews> {
    const { cursor, direction, limit } = input;

    const query = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.restaurantId = :restaurantId', {
        restaurantId: restaurant.id,
      })
      .leftJoinAndSelect('review.author', 'user')
      .leftJoinAndSelect('review.restaurant', 'restaurant');

    return this.paginationService.paginate(
      query,
      cursor,
      direction,
      limit,
      'review.id',
    );
  }
}
