import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderInput } from './order.input';
import { OrderModel } from './order.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async getOrders(): Promise<OrderModel[]> {
    return this.orderRepository.find();
  }

  async getOrdersByUser(userId: string): Promise<OrderModel[]> {
    return this.orderRepository.findBy({ user_id: userId });
  }

  async createOrder(createOrderInput: CreateOrderInput): Promise<OrderModel> {
    const { user_id, product_id, created_at, updated_at } = createOrderInput;

    // validate user_id and product_id

    const order = this.orderRepository.create({
      order_id: uuid(),
      user_id,
      product_id,
      created_at,
      updated_at,
    });

    return this.orderRepository.save(order);
  }
}
