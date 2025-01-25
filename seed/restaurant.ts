import { faker } from '@faker-js/faker';
import { User } from 'user/user.entity';
import { restaurants } from './fixtures/restaurant';
import { Menu } from 'menu/menu.entity';

export const generateRestaurants = (users: User[], menus: Menu[]) => {
  return restaurants.map((payload, index) => ({
    ...payload,
    owner: faker.helpers.arrayElement(users),
    menu: menus[index],
  }));
};
