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

  createOrder(restaurant: Restaurant, user: User, orderDate: Date) {
    const order = this.orderRepository.create({
      user,
      restaurant,
      status: OrderStatus.NEW,
      orderDate,
    });

    return this.orderRepository.save(order);
  }

  findRestaurantOrders(restaurantId: number) {
    return this.orderRepository.find({
      where: { restaurant: { id: restaurantId } },
    });
  }

  findUserOrders(userId: number) {
    return this.orderRepository.find({ where: { user: { id: userId } } });
  }

  findById(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  reviewOrder(order: Order, status: OrderStatus) {
    if (status === OrderStatus.NEW) {
      throw new Error('Cannot set new status for order');
    }

    order.status = status;

    return this.orderRepository.save(order);
  }
}
