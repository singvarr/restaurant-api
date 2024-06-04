import { faker } from '@faker-js/faker';
import { User } from 'user/user.entity';
import { restaurants } from './fixtures/restaurant';

export const generateRestaurants = (users: User[]) => {
  const owner = faker.helpers.arrayElement<User>(users);

  return restaurants.map((payload) => ({ ...payload, owner }));
};
