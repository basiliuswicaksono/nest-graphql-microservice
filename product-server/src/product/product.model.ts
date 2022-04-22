import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Product')
// @Directive('@key(fields: "id")')
export class ProductModel {
  @Field((type) => ID)
  product_id: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
