import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { UserType } from './user.type';
import { Roles } from 'auth/roles.enum';

@ObjectType()
export class MyAccountType extends PickType(UserType, [
  'id',
  'firstName',
  'lastName',
  'email',
]) {
  @Field(() => Roles, { nullable: true })
  role: Roles;
}
