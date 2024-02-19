import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'user/user.entity';
import { CuisineType } from './cuisine-type.enum';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  cuisineType: CuisineType;

  @ManyToOne(() => User, (owner) => owner.restaurants)
  @JoinColumn()
  owner: User;
}
