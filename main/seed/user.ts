import { faker } from '@faker-js/faker';

export const generateUser = (password) => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: password,
  role: null,
});
