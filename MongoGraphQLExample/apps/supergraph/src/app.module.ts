// apps/supergraph/src/app.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env', // Adjust the path as necessary
    }),

    // Configure GraphQL with Apollo Gateway
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver, // Specify the Apollo Gateway driver
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        gateway: {
          serviceList: [
            { name: 'users', url: configService.get<string>('USERS_GRAPHQL_URL') },
            { name: 'products', url: configService.get<string>('PRODUCTS_GRAPHQL_URL') },
            // Add more subgraphs here if needed
          ],
        },
        playground: true, // Enable GraphQL Playground (optional)
        introspection: true, // Enable schema introspection (optional)
      }),
    }),
  ],
})
export class AppModule {}
