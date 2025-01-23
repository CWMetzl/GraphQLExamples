// packages/users/src/users.resolver.ts

import { Resolver, Query, Mutation, Args, ID, ResolveReference } from '@nestjs/graphql';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.usersService.remove(id);
  }

  // Resolver for federated references
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): Promise<User> {
    return this.usersService.findById(reference.id);
  }
}
