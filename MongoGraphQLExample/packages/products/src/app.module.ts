// packages/products/src/app.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    // Configuration Module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env', // Adjust the path as necessary
    }),

    // Mongoose Module for MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('PRODUCTS_DB_URI'),
      }),
    }),

    // GraphQL Module with Apollo Federation
    GraphQLModule.forRoot({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        federation: true, // Enable Apollo Federation
        playground: true,
        introspection: true,
    }),

    // Products Module
    ProductsModule,
  ],
})
export class AppModule {}
