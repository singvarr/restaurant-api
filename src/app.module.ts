import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { dbConfig } from 'config/db';
import { RestaurantModule } from 'restaurant/restaurant.module';
import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'user/user.module';
import { OrderModule } from 'order/order.module';
import { TokenModule } from 'token/token.module';
import { ConfigModule } from 'config/config.module';
import { ReviewModule } from 'review/review.module';
import { PaginationModule } from 'pagination/pagination.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(dbConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
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
    OrderModule,
    AuthModule,
    TokenModule,
    PaginationModule,
    ReviewModule,
  ],
})
export class AppModule {}
