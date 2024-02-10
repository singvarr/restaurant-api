import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  async findByName(name: string): Promise<Restaurant | null> {
    return this.restaurantRepository.findOne({ where: { name } });
  }

  async createRestaurant(body: CreateRestaurantInput): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(body);
    return this.restaurantRepository.save(restaurant);
  }
}
