import { Field, InputType } from '@nestjs/graphql';
import { FilterExpression } from './filter-expression.enum';

@InputType({ isAbstract: true })
export class FilterRule {
  @Field()
  property: string;

  @Field(() => FilterExpression)
  expression: FilterExpression;

  @Field()
  value: string;
}
