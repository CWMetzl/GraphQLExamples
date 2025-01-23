import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './user.type';
import { CreateUserInput } from './create-user.input';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => UserType, { nullable: true })
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query(() => [UserType], { nullable: true })
  async usersWithLastNameStartsWith(@Args('search', { type: () => String }) search: string) {
    return this.usersService.findLastNameStartsWith(search);
  }

  @Query(() => [UserType], { nullable: true })
  async usersWithFirstNameStartsWith(@Args('search', { type: () => String }) search: string) {
    return this.usersService.findFirstNameStartsWith(search);
  }

  @Mutation(() => UserType)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
 