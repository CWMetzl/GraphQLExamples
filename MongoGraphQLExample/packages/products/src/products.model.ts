import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/src/users.model'; // Adjust the path as necessary
import { Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")') // For federation
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => User)
  owner: User; // Assuming each product has an owner
}
