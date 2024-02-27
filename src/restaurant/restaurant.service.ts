import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { CuisineType } from './cuisine-type.enum';

interface CreateRestaurantInput {
  name: string;
  cuisineType: CuisineType;
}

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async findAll() {
    return this.restaurantRepository.find();
  }

  async findByName(name: string) {
    return this.restaurantRepository.findOne({ where: { name } });
  }

  async createRestaurant(body: CreateRestaurantInput) {
    const restaurant = this.restaurantRepository.create(body);
    return this.restaurantRepository.save(restaurant);
  }

  async findRestaurantById(id: number) {
    return this.restaurantRepository.findOne({ where: { id } });
  }

  async findUserRestaurants(userId: number) {
    return this.restaurantRepository.find({ where: { owner: { id: userId } } });
  }
}
