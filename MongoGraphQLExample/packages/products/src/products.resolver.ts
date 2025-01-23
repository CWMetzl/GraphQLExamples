// packages/products/src/products.resolver.ts

import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';
import { Product } from './schemas/product.schema';
import { ProductsService } from './products.service';
import { CreateProductInput, UpdateProductInput } from './dto/product.input';
import { User } from '../../users/src/schemas/user.schema'; // Ensure correct import path

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  async getProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product', nullable: true })
  async getProduct(@Args('id', { type: () => ID }) id: string): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: CreateProductInput): Promise<Product> {
    return this.productsService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.productsService.remove(id);
  }

  // Resolver for federated references
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): Promise<Product> {
    return this.productsService.findById(reference.id);
  }

  // Resolve owner field
  @ResolveField(() => User)
  async owner(@Parent() product: Product): Promise<User> {
    const { owner } = product;
    return this.productsService.getUserById(owner.id);
  }
}
