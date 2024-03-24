import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrGuard } from '@nest-lab/or-guard';
import { RestaurantType } from './restaurant.type';
import { RestaurantService } from '../restaurant.service';
import { RestaurantOwnerGuard } from '../restaurant-owner.guard';
import { UserType } from 'user/api/user.type';
import { UserService } from 'user/user.service';
import { OrderType } from 'order/api/order.type';
import { OrderService } from 'order/order.service';
import { Roles } from 'auth/roles.enum';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Role } from 'constants/roles.decorator';

@Resolver(() => RestaurantType)
export class RestaurantResolver {
  constructor(
    private restaurantService: RestaurantService,
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  @Query(() => [RestaurantType])
  findAllRestaurants() {
    return this.restaurantService.findAll();
  }

  @Query(() => RestaurantType, { nullable: true })
  findRestaurantByName(@Args('name', { type: () => String }) name: string) {
    return this.restaurantService.findByName(name);
  }

  @ResolveField('owner', () => UserType, { nullable: true })
  owner(@Parent() user: UserType) {
    return this.userService.findUserById(user.id);
  }

  @Role(Roles.SUPERADMIN)
  @UseGuards(OrGuard([RolesGuard, RestaurantOwnerGuard]))
  @ResolveField('orders', () => [OrderType])
  restaurantOrders(@Parent() restaurant: RestaurantType) {
    return this.orderService.findRestaurantOrders(restaurant.id);
  }
}
