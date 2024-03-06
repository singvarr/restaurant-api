import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserInput } from './api/update-user.input';
import { RegisterUserInput } from 'auth/api/register-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(body: RegisterUserInput): Promise<User> {
    const user = this.userRepository.create(body);

    return this.userRepository.save(user);
  }

  findAllUsers() {
    return this.userRepository.find();
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async deleteUserById(userId: number) {
    const { affected } = await this.userRepository.delete(userId);

    return { affected };
  }

  async updateUser(user: User, body: UpdateUserInput) {
    await this.userRepository.update({ id: user.id }, body);

    return this.findUserById(user.id);
  }
}
