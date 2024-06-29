import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from './sort-order.enum';

@InputType({ isAbstract: true })
export class SortRule {
  @Field()
  property: string;

  @Field(() => SortOrder)
  direction: SortOrder;
}
