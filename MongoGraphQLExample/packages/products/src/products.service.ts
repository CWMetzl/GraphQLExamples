// packages/products/src/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductInput, UpdateProductInput } from './dto/product.input';
import { UsersService } from '../../users/src/users.service'; // Adjust the path as necessary

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly usersService: UsersService, // Inject UsersService
  ) {}

  /**
   * Retrieves all products from the database.
   */
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  /**
   * Retrieves a product by its ID.
   * @param id - Product's unique identifier.
   */
  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  /**
   * Creates a new product.
   * @param input - Data required to create a product.
   */
  async create(input: CreateProductInput): Promise<Product> {
    // Validate owner exists
    const owner = await this.usersService.findById(input.ownerId);
    if (!owner) {
      throw new NotFoundException(`User with ID "${input.ownerId}" not found`);
    }

    const createdProduct = new this.productModel({
      name: input.name,
      description: input.description,
      price: input.price,
      owner: owner.id, // Store owner's ID
    });

    return createdProduct.save();
  }

  /**
   * Updates an existing product.
   * @param id - Product's unique identifier.
   * @param input - Data to update the product.
   */
  async update(id: string, input: UpdateProductInput): Promise<Product> {
    const existingProduct = await this.productModel.findById(id).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    if (input.ownerId) {
      const owner = await this.usersService.findById(input.ownerId);
      if (!owner) {
        throw new NotFoundException(`User with ID "${input.ownerId}" not found`);
      }
      existingProduct.owner = owner;
    }

    existingProduct.name = input.name ?? existingProduct.name;
    existingProduct.description = input.description ?? existingProduct.description;
    existingProduct.price = input.price ?? existingProduct.price;

    return existingProduct.save();
  }

  /**
   * Deletes a product by its ID.
   * @param id - Product's unique identifier.
   */
  async remove(id: string): Promise<boolean> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  /**
   * Fetches user details by user ID.
   * @param userId - User's unique identifier.
   */
  async getUserById(userId: string): Promise<any> {
    return this.usersService.findById(userId);
  }
}
