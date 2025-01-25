import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      resolvers: { JSON: GraphQLJSON },
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: false,
      installSubscriptionHandlers: true,
      fieldResolverEnhancers: ['guards'],
      subscriptions: {
        'graphql-ws': true,
        // Important: graphql-ws isn't supported by default GraphQL playground
        'subscriptions-transport-ws': process.env.NODE_ENV === 'development',
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
