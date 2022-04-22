import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsDecimal,
  IsOptional,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @MinLength(3)
  @Field()
  name: string;

  @IsDecimal()
  @Field()
  price: number;

  @IsDateString()
  @Field({ defaultValue: new Date().toISOString() })
  created_at: string;

  @IsDateString()
  @Field({ defaultValue: new Date().toISOString() })
  updated_at: string;
}

@InputType()
export class UpdateProductInput {
  @Field()
  product_id!: string;

  @MinLength(3)
  @Field()
  name: string;

  @IsDecimal()
  @Field()
  price: number;

  @IsDateString()
  @Field({ defaultValue: new Date().toISOString() })
  updated_at: string;
}

@InputType()
export class DeleteProductInput {
  @Field()
  product_id!: string;
}
