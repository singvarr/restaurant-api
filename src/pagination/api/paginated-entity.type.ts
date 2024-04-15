import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginationMeta } from './paginated-response.type';

export function PaginatedResponse<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(() => PaginationMeta, { nullable: true })
    pageInfo: PaginationMeta;
  }

  return PaginatedType;
}
