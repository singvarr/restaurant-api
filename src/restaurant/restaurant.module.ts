import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { RestaurantResolver } from './api/restaurant.query';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { RestaurantMutations } from './api/restaurant.mutation';
import { UserModule } from 'user/user.module';
import { ReservationModule } from 'reservation/reservation.module';
import { RestaurantOwnerGuard } from './restaurant-owner.guard';
import { MenuModule } from 'menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    forwardRef(() => UserModule),
    forwardRef(() => ReservationModule),
    MenuModule,
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
