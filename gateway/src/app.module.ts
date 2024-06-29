import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      server: {
        installSubscriptionHandlers: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },

      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'main', url: process.env.MAIN_API_URL },
            { name: 'delivery', url: process.env.DELIVERY_API_URL },
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
