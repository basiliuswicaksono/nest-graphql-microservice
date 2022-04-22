import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService, ProductResolver],
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [],
})
export class ProductModule {}
