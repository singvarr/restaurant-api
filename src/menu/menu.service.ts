import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Menu } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  findRestaurantMenu(restaurantId: number): Promise<Menu | null> {
    return this.menuRepository.findOne({
      where: {
        restaurant: {
          id: restaurantId,
        },
      },
    });
  }
}
