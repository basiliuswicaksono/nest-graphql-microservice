import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Order')
// @Directive('@key(fields: "id")')
export class OrderModel {
  @Field((type) => ID)
  order_id: string;

  @Field()
  product_id: string;

  @Field()
  user_id: string;
}
