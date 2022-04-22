import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import {
  CreateProductInput,
  DeleteProductInput,
  UpdateProductInput,
} from './product.input';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Resolver((of) => ProductModel)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query((returns) => [ProductModel])
  async getProducts(): Promise<ProductModel[]> {
    return this.productService.getProducts();
  }

  @Mutation((returns) => ProductModel)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<ProductModel> {
    return this, this.productService.createProduct(createProductInput);
  }

  @Mutation((returns) => ProductModel)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<ProductModel> {
    return this, this.productService.updateProduct(updateProductInput);
  }

  @Mutation((returns) => String)
  async deleteProduct(
    @Args('deleteProductInput') deleteProductInput: DeleteProductInput,
  ): Promise<string> {
    return this.productService.deleteProduct(deleteProductInput);
  }

  // from microservis
  // @MessagePattern({ cmd: 'get_products_to_user' })
  // async getProductsToUser(): Promise<string> {
  //   try {
  //     console.log('masuk2');
  //     return 'this.productService.getProducts()';
  //   } catch (error) {
  //     console.log('error masuk2');
  //   }
  // }
}
