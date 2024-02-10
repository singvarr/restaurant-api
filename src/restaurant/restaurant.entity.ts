import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CuisineType } from './cuisine-type.enum';

@Entity()
export class Restaurant {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cuisineType: CuisineType;
}
