import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Login')
export class LoginModel {
  @Field()
  token: string;
}
