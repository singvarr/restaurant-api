import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewResolver } from './api/review.query';
import { ReviewMutations } from './api/review.mutation';
import { Review } from './review.entity';
import { RestaurantModule } from 'restaurant/restaurant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), RestaurantModule],
  providers: [ReviewService, ReviewResolver, ReviewMutations],
})
export class ReviewModule {}
