import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProductInput,
  DeleteProductInput,
  UpdateProductInput,
} from './product.input';
import { Product } from './product.entity';
import { ProductModel } from './product.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<ProductModel[]> {
    return this.productRepository.find();
  }

  async createProduct(
    createProductInput: CreateProductInput,
  ): Promise<ProductModel> {
    const { name, price, created_at, updated_at } = createProductInput;
    const product = this.productRepository.create({
      product_id: uuid(),
      name,
      price,
      created_at,
      updated_at,
    });

    return this.productRepository.save(product);
  }

  async updateProduct(
    updateProductInput: UpdateProductInput,
  ): Promise<ProductModel> {
    const { product_id, name, price, updated_at } = updateProductInput;
    await this.productRepository.update(
      { product_id },
      { name, price, updated_at },
    );

    const product = await this.productRepository.findOneBy({ product_id });

    return product;
  }

  async deleteProduct(deleteProductInput: DeleteProductInput): Promise<string> {
    const { product_id } = deleteProductInput;
    const result = await this.productRepository.delete({ product_id });

    if (result.affected === 0) {
      throw new NotFoundException(`Product id: ${product_id} not Found`);
    }

    return 'Product removed';
  }
}
