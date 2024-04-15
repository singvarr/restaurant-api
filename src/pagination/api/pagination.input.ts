import { Field, InputType, Int } from '@nestjs/graphql';
import { PaginationDirection } from './pagination-direction.enum';
import { IsInt, Min } from 'class-validator';
import { PaginationService } from 'pagination/pagination.service';

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  cursor: string;

  @Field(() => PaginationDirection, {
    nullable: true,
    defaultValue: PaginationDirection.FORWARD,
  })
  direction: PaginationDirection;

  @Field(() => Int, {
    nullable: true,
    defaultValue: PaginationService.DEFAULT_PAGE_SIZE,
  })
  @IsInt()
  @Min(0)
  limit: number;
}
