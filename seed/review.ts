import { faker } from '@faker-js/faker';
import { Restaurant } from 'restaurant/restaurant.entity';
import { Review } from 'review/review.entity';
import { User } from 'user/user.entity';

export const generateReview = (
  reviewer: User,
  restaurant: Restaurant,
): Omit<Review, 'id' | 'createdAt'> => ({
  feedback: faker.lorem.paragraphs({ min: 1, max: 3 }).slice(0, 200),
  author: reviewer,
  rating: faker.number.int({ min: 1, max: 5 }),
  restaurant,
});
