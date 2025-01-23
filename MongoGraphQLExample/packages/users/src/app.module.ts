// packages/users/src/app.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users.module';
import { ApolloDriver } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env', // Adjust the path based on your monorepo structure
    }),

    // Connect to MongoDB using Mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('USERS_DB_URI'),
      }),
    }),

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Already handled in UsersModule

    // Configure GraphQL with Apollo Federation
    GraphQLModule.forRoot({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        federation: true, // Enable Apollo Federation
        playground: true,
        introspection: true,
    }),

    // Import UsersModule to include UsersService and UsersResolver
    UsersModule,
  ],
})
export class AppModule {}
