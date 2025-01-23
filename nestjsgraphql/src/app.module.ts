import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Modules
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 1) Configure TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_graphql_db',
      autoLoadEntities: true, // automatically load entities from 'entities' directory
      synchronize: true, // DO NOT USE 'true' IN PRODUCTION
    }),

    // 2) Configure GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),

    // 3) Example Module
    UsersModule,
  ],
})
export class AppModule {}
