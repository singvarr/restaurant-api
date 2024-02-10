import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RestaurantService } from '../restaurant.service';
import { RestaurantType } from './restaurant.type';
import { CreateRestaurantInput } from './create-restaurant.input';

@Resolver(() => RestaurantType)
export class RestaurantMutations {
  constructor(private restaurantService: RestaurantService) {}

  @Mutation(() => RestaurantType)
  async createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ) {
    return this.restaurantService.createRestaurant(createRestaurantInput);
  }
}
