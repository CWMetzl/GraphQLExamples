// packages/users/src/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Retrieves all users from the database.
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Retrieves a user by their ID.
   * @param id - User's unique identifier.
   */
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  /**
   * Creates a new user.
   * @param input - Data required to create a user.
   */
  async create(input: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel({
      name: input.name,
      email: input.email,
    });
    return createdUser.save();
  }

  /**
   * Updates an existing user.
   * @param id - User's unique identifier.
   * @param input - Data to update the user.
   */
  async update(id: string, input: UpdateUserInput): Promise<User> {
    const existingUser = await this.findById(id);

    existingUser.name = input.name ?? existingUser.name;
    existingUser.email = input.email ?? existingUser.email;

    return existingUser.save();
  }

  /**
   * Deletes a user by their ID.
   * @param id - User's unique identifier.
   */
  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
