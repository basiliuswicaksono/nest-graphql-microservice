import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
// @Directive('@key(fields: "id")')
export class UserModel {
  @Field((type) => ID)
  user_id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  role: string;
}
