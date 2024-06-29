import { Restaurant } from 'restaurant/restaurant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from 'user/user.entity';

@Entity()
@Unique(['author', 'restaurant'])
export class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  rating: number;

  @Column({ type: 'varchar', length: 200 })
  feedback: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  author: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;
}
