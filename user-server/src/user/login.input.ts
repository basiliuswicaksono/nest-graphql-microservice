import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @MinLength(3)
  @Field()
  email: string;

  @MinLength(8)
  @Field()
  password: string;
}
