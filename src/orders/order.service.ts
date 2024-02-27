import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderStatus } from './order-status.enum';
import { Restaurant } from 'restaurant/restaurant.entity';
import { User } from 'user/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(restaurant: Restaurant, user: User, orderDate: Date) {
    const order = this.orderRepository.create({
      user,
      restaurant,
      status: OrderStatus.NEW,
      orderDate,
    });

    return this.orderRepository.save(order);
  }

  async findRestaurantOrders(restaurantId: number) {
    return this.orderRepository.find({
      where: { restaurant: { id: restaurantId } },
    });
  }

  async findUserOrders(user: User) {
    return this.orderRepository.find({ where: { user } });
  }
}
