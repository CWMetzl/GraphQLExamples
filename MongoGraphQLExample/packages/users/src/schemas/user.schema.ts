// packages/users/src/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
@Directive('@key(fields: "id")') // Apollo Federation directive
export class User extends Document {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
