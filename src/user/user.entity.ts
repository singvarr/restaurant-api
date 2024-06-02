import { IsEmail, IsStrongPassword } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from 'restaurant/restaurant.entity';
import { Order } from 'order/order.entity';
import { Roles } from 'auth/roles.enum';
import { Review } from 'review/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  @IsStrongPassword()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Roles, nullable: true, default: null })
  role: Roles;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.author)
  reviews: Review[];
}
