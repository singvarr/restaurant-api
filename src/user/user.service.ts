import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserInput } from './api/update-user.input';
import { RegisterUserInput } from 'auth/api/register-user.input';
import { PaginationService } from 'pagination/pagination.service';
import { PaginationInput } from 'pagination/api/pagination.input';
import { PaginatedUsers } from './api/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private paginationService: PaginationService<User>,
  ) {}

  createUser(body: RegisterUserInput): Promise<User> {
    const user = this.userRepository.create(body);

    return this.userRepository.save(user);
  }

  async findAllUsers(input: PaginationInput): Promise<PaginatedUsers> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.reservations', 'reservations')

    return this.paginationService.paginate(query, input, 'user.id');
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
