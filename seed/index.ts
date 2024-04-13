import { User } from 'user/user.entity';
import { generateUser } from './user';
import source from '../ormconfig';

const USERS_COUNT = 100;

const run = async () => {
  try {
    await source.initialize();

    const usersData = Array.from({ length: USERS_COUNT }, () => generateUser());
    const userRepository = source.getRepository(User);

    const users = userRepository.create(usersData);

    await userRepository.save(users);
  } catch (error) {
    console.log(`Error occurred ${error}`);
  }
};

run();
