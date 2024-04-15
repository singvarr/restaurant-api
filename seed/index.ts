import { hash } from 'bcrypt';
import { User } from 'user/user.entity';
import { generateUser } from './user';
import source from '../ormconfig';

const USERS_COUNT = 100;
const DEFAULT_USER_PASSWORD = 'Qwerty123!';
const SALT_ROUNDS = 10;

const run = async () => {
  try {
    await source.initialize();
    const hashedPassword = await hash(DEFAULT_USER_PASSWORD, SALT_ROUNDS);
    const usersData = Array.from({ length: USERS_COUNT }, () =>
      generateUser(hashedPassword),
    );

    const userRepository = source.getRepository(User);
    const users = userRepository.create(usersData);
    await userRepository.save(users);
  } catch (error) {
    console.log(`Error occurred ${error}`);
  }
};

run();
