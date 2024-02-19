import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './api/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(body: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(body);

    return this.userRepository.save(user);
  }

  async findAllUsers() {
    return this.userRepository.find();
  }

  async findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
