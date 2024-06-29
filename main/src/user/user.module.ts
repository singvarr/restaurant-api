import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserMutations } from './api/user.mutation';
import { UserQuery } from './api/user.query';
import { RestaurantModule } from 'restaurant/restaurant.module';
import { ReservationModule } from 'reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => RestaurantModule),
    forwardRef(() => ReservationModule),
  ],
  providers: [UserService, UserMutations, UserQuery],
  exports: [UserService],
})
export class UserModule {}
