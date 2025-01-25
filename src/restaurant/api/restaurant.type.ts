import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CuisineType } from '../cuisine-type.enum';
import { UserType } from 'user/api/user.type';
import { MenuType } from 'menu/api/menu.type';

@ObjectType()
export class RestaurantType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => CuisineType)
  cuisineType: CuisineType;

  @Field(() => UserType, { nullable: true })
  owner?: UserType;

  @Field(() => MenuType)
  menu: MenuType;
}
