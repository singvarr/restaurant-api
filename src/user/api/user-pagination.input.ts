import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { FilterRule } from 'pagination/api/filter-rule.input';
import { PaginationInput } from 'pagination/api/pagination.input';
import { SortRule } from 'pagination/api/sort-rule.input';

enum UserSortFields {
  EMAIL = 'user.email',
  FIRST_NAME = 'user.firstName',
  LAST_NAME = 'user.lastName',
}

registerEnumType(UserSortFields, { name: 'UserSortFields' });

@InputType()
class UserSortType extends SortRule {
  @Field(() => UserSortFields)
  property: UserSortFields;
}

enum UserFilterFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
}

registerEnumType(UserFilterFields, { name: 'UserFilterFields' });

@InputType()
class UserFilterType extends FilterRule {
  @Field(() => UserFilterFields)
  property: UserFilterFields;
}

@InputType()
export class UserPaginationInput extends PaginationInput {
  @Field(() => [UserSortType], {
    nullable: true,
    defaultValue: null,
  })
  sort?: UserSortType[];

  @Field(() => [UserFilterType], { nullable: true })
  filter?: UserFilterType[];
}
