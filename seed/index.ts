import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from 'user/user.entity';
import source from '../ormconfig';
import { generateUser } from './user';
import { generateRestaurants } from './restaurant';
import { Restaurant } from 'restaurant/restaurant.entity';
import { Review } from 'review/review.entity';
import { generateReview } from './review';

const USERS_COUNT = 100;
const DEFAULT_USER_PASSWORD = 'Qwerty123!';
const SALT_ROUNDS = 10;

const run = async () => {
  try {
    console.log('Initialize data source');
    await source.initialize();

    console.log('Generate users');
    const hashedPassword = await hash(DEFAULT_USER_PASSWORD, SALT_ROUNDS);
    const usersData = Array.from({ length: USERS_COUNT }, () =>
      generateUser(hashedPassword),
    );
    const userRepository = source.getRepository(User);
    const users = userRepository.create(usersData);
    await userRepository.save(users);
    console.log(`Successfully generated ${users.length} users`);

    console.log('Generate restaurants');
    const restaurantsData = generateRestaurants(users);
    const restaurantRepository = source.getRepository(Restaurant);
    const restaurants = restaurantRepository.create(restaurantsData);
    await restaurantRepository.save(restaurants);
    console.log(`Successfully generated ${restaurants.length} restaurants`);

    console.log('Generate reviews');
    const reviewRepository = source.getRepository(Review);
    const reviewsData = users.reduce<Review[]>((acc, user) => {
      const restaurantsToReview = faker.helpers.arrayElements(restaurants, {
        min: 1,
        max: restaurants.length,
      });

      const userReviews = restaurantsToReview.map((restaurant) => {
        const reviewPayload = generateReview(user, restaurant);

        return reviewRepository.create(reviewPayload);
      });

      return [...acc, ...userReviews];
    }, []);
    const reviews = await reviewRepository.save(reviewsData);
    console.log(`Successfully added ${reviews.length} reviews`);
  } catch (error) {
    console.log(`Error occurred ${error}`);
  }
};

run();
