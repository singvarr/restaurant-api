import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CuisineType } from './cuisine-type.enum';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  cuisineType: CuisineType;
}
