import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, MinLength } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @MinLength(3)
  @Field()
  product_id: string;

  @MinLength(3)
  @Field()
  user_id: string;

  @IsDateString()
  @Field({ defaultValue: new Date().toISOString() })
  created_at: string;

  @IsDateString()
  @Field({ defaultValue: new Date().toISOString() })
  updated_at: string;
}
