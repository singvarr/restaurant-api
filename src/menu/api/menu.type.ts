import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class MenuType {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLJSON)
  menu: JSON;
}
