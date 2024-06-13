import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { FilterRule } from 'pagination/api/filter-rule.input';
import { PaginationInput } from 'pagination/api/pagination.input';
import { SortOrder } from 'pagination/api/sort-order.enum';
import { SortRule } from 'pagination/api/sort-rule.input';

enum ReviewSortFields {
  CREATED_AT = 'review.createdAt',
  RATING = 'review.rating',
  FIRST_NAME = 'author.firstName',
  LAST_NAME = 'author.lastName',
}

registerEnumType(ReviewSortFields, { name: 'ReviewSortFields' });

@InputType()
class ReviewSortType extends SortRule {
  @Field(() => ReviewSortFields)
  property: ReviewSortFields;
}

enum ReviewFilterFields {
  FEEDBACK = 'feedback',
  RATING = 'rating',
  FIRST_NAME = 'author.firstName',
  LAST_NAME = 'author.lastName',
}

registerEnumType(ReviewFilterFields, { name: 'ReviewFilterFields' });

@InputType()
class ReviewFilterType extends FilterRule {
  @Field(() => ReviewFilterFields)
  property: ReviewFilterFields;
}

const DEFAULT_REVIEW_SORTING = [
  {
    property: ReviewSortFields.CREATED_AT,
    direction: SortOrder.DESC,
  },
];

@InputType()
export class ReviewPaginationInput extends PaginationInput {
  @Field(() => [ReviewSortType], {
    nullable: true,
    defaultValue: DEFAULT_REVIEW_SORTING,
  })
  sort?: ReviewSortType[];

  @Field(() => [ReviewFilterType], { nullable: true })
  filter?: ReviewFilterType[];
}
