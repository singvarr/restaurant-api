import { Restaurant } from 'restaurant/restaurant.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Menu as MenuItems } from 'menu/menu.interface';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column({ type: 'jsonb' })
  menu: MenuItems;
}
