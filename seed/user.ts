import { faker } from '@faker-js/faker';

const DEFAULT_USER_PASSWORD = 'Qwerty123!';

export const generateUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: DEFAULT_USER_PASSWORD,
  role: null,
});
