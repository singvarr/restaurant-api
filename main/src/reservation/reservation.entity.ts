import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from 'restaurant/restaurant.entity';
import { User } from 'user/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('date')
  reservationDate: Date;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  restaurant: Restaurant;
}
