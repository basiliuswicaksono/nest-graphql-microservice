import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderInput } from './order.input';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

@Resolver((of) => OrderModel)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query((returns) => [OrderModel])
  async getOrders(): Promise<OrderModel[]> {
    return this.orderService.getOrders();
  }

  @Query((returns) => [OrderModel])
  async getOrdersByUser(@Args('userId') userId: string): Promise<OrderModel[]> {
    return this.orderService.getOrdersByUser(userId);
  }

  @Mutation((returns) => OrderModel)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<OrderModel> {
    return this, this.orderService.createOrder(createOrderInput);
  }
}
