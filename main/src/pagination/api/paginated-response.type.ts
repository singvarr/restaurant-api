import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PaginationMeta {
  @Field()
  hasPrevPage: boolean;

  @Field()
  hasNextPage: boolean;
}
