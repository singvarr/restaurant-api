import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthSuccessType {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
