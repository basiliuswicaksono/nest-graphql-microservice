import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  providers: [OrderService, OrderResolver],
  imports: [TypeOrmModule.forFeature([Order])],
  exports: [],
})
export class OrderModule {}
