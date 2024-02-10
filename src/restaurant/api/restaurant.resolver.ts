import { Resolver, Query, Args } from '@nestjs/graphql';
import { RestaurantType } from './restaurant.type';
import { RestaurantService } from '../restaurant.service';

@Resolver(() => RestaurantType)
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  @Query(() => [RestaurantType])
  async findAllRestaurants() {
    return this.restaurantService.findAll();
  }

  @Query(() => RestaurantType, { nullable: true })
  async findByName(
    @Args('name', { type: () => String }) name: string,
  ): Promise<RestaurantType | undefined> {
    return this.restaurantService.findByName(name);
  }
}
