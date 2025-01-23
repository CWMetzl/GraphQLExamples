// packages/products/src/products.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { UsersModule } from '../../users/src/users.module'; // Adjust the path as necessary

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UsersModule, // Import UsersModule to access UsersService
  ],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService], // Export if needed in other modules
})
export class ProductsModule {}
