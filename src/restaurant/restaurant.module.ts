import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { RestaurantResolver } from './api/restaurant.query';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { RestaurantMutations } from './api/restaurant.mutation';
import { UserModule } from 'user/user.module';
import { OrderModule } from 'order/order.module';
import { RestaurantOwnerGuard } from './restaurant-owner.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    forwardRef(() => UserModule),
    forwardRef(() => OrderModule),
  ],
  providers: [
    RestaurantResolver,
    RestaurantMutations,
    RestaurantOwnerGuard,
    RestaurantService,
  ],
  exports: [RestaurantService],
})
export class RestaurantModule {}
