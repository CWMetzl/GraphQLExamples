// packages/products/src/schemas/product.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { User } from '../../../users/src/schemas/user.schema'; // Adjust the path as necessary
import { Directive } from '@nestjs/graphql';

@Schema({ timestamps: true })
@ObjectType()
@Directive('@key(fields: "id")') // Apollo Federation directive
export class Product extends Document {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ required: true })
  @Field(() => Float)
  price: number;

  @Prop({ type: String, required: true })
  @Field(() => User)
  owner: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
