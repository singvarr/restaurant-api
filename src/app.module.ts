import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'config/db';
import { RestaurantModule } from 'restaurant/restaurant.module';
import { UserModule } from 'user/user.module';
import { OrderModule } from 'order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: true,
    }),
    RestaurantModule,
    UserModule,
    OrderModule,
  ],
})
export class AppModule {}
