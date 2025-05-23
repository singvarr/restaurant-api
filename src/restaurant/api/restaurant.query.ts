import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrGuard } from '@nest-lab/or-guard';
import { RestaurantType } from './restaurant.type';
import { RestaurantService } from '../restaurant.service';
import { RestaurantOwnerGuard } from '../restaurant-owner.guard';
import { UserType } from 'user/api/user.type';
import { UserService } from 'user/user.service';
import { ReservationType } from 'reservation/api/reservation.type';
import { ReservationService } from 'reservation/reservation.service';
import { Roles } from 'auth/roles.enum';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Role } from 'constants/roles.decorator';
import { Public } from 'constants/is-public.decorator';
import { MenuType } from 'menu/api/menu.type';
import { MenuService } from 'menu/menu.service';

@Resolver(() => RestaurantType)
export class RestaurantResolver {
  constructor(
    private restaurantService: RestaurantService,
    private userService: UserService,
    private reservationService: ReservationService,
    private menuService: MenuService,
  ) {}

  @Query(() => [RestaurantType])
  findAllRestaurants() {
    return this.restaurantService.findAll();
  }

  @Public()
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
  @ResolveField('reservations', () => [ReservationType])
  restaurantReservations(@Parent() restaurant: RestaurantType) {
    return this.reservationService.findRestaurantReservations(restaurant.id);
  }

  @ResolveField('menu', () => MenuType, { nullable: true })
  menu(@Parent() restaurant: RestaurantType) {
    return this.menuService.findRestaurantMenu(restaurant.id);
  }
}
