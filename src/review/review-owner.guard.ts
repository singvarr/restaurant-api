import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ReviewService } from './review.service';

@Injectable()
export class ReviewOwnerGuard implements CanActivate {
  constructor(private reviewService: ReviewService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const graphQLContext = GqlExecutionContext.create(context);
    const { req: request } = graphQLContext.getContext();

    const review = graphQLContext.getRoot();

    return this.reviewService.isOwner(review, request.user);
  }
}
