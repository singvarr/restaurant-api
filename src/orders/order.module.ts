import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderMutations } from './api/order.mutation';
import { UserModule } from 'user/user.module';
import { RestaurantModule } from 'restaurant/restaurant.module';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => UserModule),
    forwardRef(() => RestaurantModule),
  ],
  providers: [OrderMutations, OrderService],
  exports: [OrderService],
})
export class OrdersModule {}
