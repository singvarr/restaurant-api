import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationMutations } from './api/reservation.mutation';
import { UserModule } from 'user/user.module';
import { RestaurantModule } from 'restaurant/restaurant.module';
import { ReservationService } from './reservation.service';
import { ReservationSubscriptions } from './api/reservation.subscription';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    forwardRef(() => UserModule),
    forwardRef(() => RestaurantModule),
  ],
  providers: [
    ReservationMutations,
    ReservationService,
    // ReservationSubscriptions,
  ],
  exports: [ReservationService],
})
export class ReservationModule {}
