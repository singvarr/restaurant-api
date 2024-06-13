import { faker } from '@faker-js/faker';
import { Menu } from 'menu/menu.interface';

const categoriesCount = {
  MIN: 3,
  MAX: 7,
};

const dishesInCategoryCount = {
  MIN: 7,
  MAX: 12,
};

export const generateMenu = (): Menu =>
  Array.from(
    {
      length: faker.number.int({
        min: categoriesCount.MIN,
        max: categoriesCount.MAX,
      }),
    },
    () => {
      const dishes = Array.from(
        {
          length: faker.number.int({
            min: dishesInCategoryCount.MIN,
            max: dishesInCategoryCount.MAX,
          }),
        },
        () => ({
          name: faker.commerce.product(),
          price: Number(faker.commerce.price()),
        }),
      );

      return {
        dishes,
        categoryName: faker.commerce.product(),
      };
    },
  );
