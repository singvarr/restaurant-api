import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'user/user.entity';
import { CuisineType } from './cuisine-type.enum';
import { Order } from 'order/order.entity';
import { Review } from 'review/review.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  cuisineType: CuisineType;

  @ManyToOne(() => User, (owner) => owner.restaurants, { onDelete: 'SET NULL' })
  @JoinColumn()
  owner: User;

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}
