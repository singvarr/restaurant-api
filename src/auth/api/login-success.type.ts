import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginSuccessType {
  @Field()
  accessToken: string;
}
