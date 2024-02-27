import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { RestaurantResolver } from './api/restaurant.query';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { RestaurantMutations } from './api/restaurant.mutation';
import { UserModule } from 'user/user.module';
import { OrdersModule } from 'orders/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    forwardRef(() => UserModule),
    forwardRef(() => OrdersModule),
  ],
  providers: [RestaurantResolver, RestaurantMutations, RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
