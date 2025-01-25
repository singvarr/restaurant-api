import { InputType, PartialType } from '@nestjs/graphql';
import { CreateReviewInput } from './create-review.input';

@InputType()
export class EditReviewInput extends PartialType(CreateReviewInput) {}
