import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { ReservationStatus } from './reservation-status.enum';
import { Restaurant } from 'restaurant/restaurant.entity';
import { User } from 'user/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  createReservation(restaurant: Restaurant, user: User, reservationDate: Date) {
    const reservation = this.reservationRepository.create({
      user,
      restaurant,
      status: ReservationStatus.NEW,
      reservationDate: reservationDate,
    });

    return this.reservationRepository.save(reservation);
  }

  findRestaurantReservations(restaurantId: number) {
    return this.reservationRepository.find({
      where: { restaurant: { id: restaurantId } },
    });
  }

  findUserReservations(userId: number) {
    return this.reservationRepository.find({ where: { user: { id: userId } } });
  }

  findById(id: number) {
    return this.reservationRepository.findOne({ where: { id } });
  }

  reviewReservation(reservation: Reservation, status: ReservationStatus) {
    if (status === ReservationStatus.NEW) {
      throw new Error('Cannot set new status for reservation');
    }

    reservation.status = status;

    return this.reservationRepository.save(reservation);
  }
}
