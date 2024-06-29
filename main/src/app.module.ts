import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import GraphQLJSON from 'graphql-type-json';

import { dbConfig } from 'config/db';
import { RestaurantModule } from 'restaurant/restaurant.module';
import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'user/user.module';
import { ReservationModule } from 'reservation/reservation.module';
import { TokenModule } from 'token/token.module';
import { ConfigModule } from 'config/config.module';
import { ReviewModule } from 'review/review.module';
import { PaginationModule } from 'pagination/pagination.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(dbConfig),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      resolvers: { JSON: GraphQLJSON },
      autoSchemaFile: true,
      fieldResolverEnhancers: ['guards'],
      // Important: subscription handlers aren't supported in nest-apollo subgraph driver yet:
      // https://github.com/nestjs/graphql/issues/2879
      installSubscriptionHandlers: false,
      // subscriptions: {
      //   'graphql-ws': true,
      //   // Important: graphql-ws isn't supported by default GraphQL playground
      //   'subscriptions-transport-ws': process.env.NODE_ENV === 'development',
      // },
      playground: false,
      // Important: introspection fails due to bug with handling of enum values:
      // https://github.com/nestjs/graphql/issues/1337
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    RestaurantModule,
    UserModule,
    ReservationModule,
    AuthModule,
    TokenModule,
    PaginationModule,
    ReviewModule,
    MenuModule,
  ],
})
export class AppModule {}
