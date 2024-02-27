import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from 'restaurant/restaurant.entity';
import { User } from 'user/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('date')
  orderDate: Date;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  restaurant: Restaurant;
}
