import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsEnum, MinLength } from 'class-validator';
import { Role } from './user.enum';

@InputType()
export class CreateUserInput {
  @MinLength(3)
  @Field()
  name: string;

  @MinLength(3)
  @Field()
  email: string;

  @MinLength(8)
  @Field()
  password: string;

  @IsEnum(Role)
  @Field()
  role: string;

  @IsDateString()
  @Field({ defaultValue: new Date().toISOString() })
  created_at: string;

  @IsDateString()
  @Field({ defaultValue: new Date().toISOString() })
  updated_at: string;
}
