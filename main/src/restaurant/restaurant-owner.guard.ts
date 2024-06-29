import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';

@Injectable()
export class RestaurantOwnerGuard implements CanActivate {
  constructor(private restaurantService: RestaurantService) {}
  canActivate(context: ExecutionContext): Promise<boolean> {
    const graphQLContext = GqlExecutionContext.create(context);
    const { req: request } = graphQLContext.getContext();

    const restaurant = graphQLContext.getRoot();

    return this.restaurantService.isOwner(restaurant, request.user);
  }
}
