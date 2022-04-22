import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { ProductModel } from 'src/product/product.model';
import { Any } from 'typeorm';
import { LoginInput } from './login.input';
import { LoginModel } from './login.model';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UserModel } from './user.model';
import { UsersService } from './user.service';

@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [UserModel])
  @UseGuards(GqlAuthGuard)
  async getUsers(@CurrentUser() user: User): Promise<UserModel[]> {
    console.log(user, '<<< user');
    if (user.role !== 'admin') {
      throw new UnauthorizedException(
        'Please check your login credentials role',
      );
    }
    return this.usersService.getUsers();
  }

  @Mutation((returns) => UserModel)
  async register(
    @Args('registerInput') registerInput: CreateUserInput,
  ): Promise<UserModel> {
    return this.usersService.register(registerInput);
  }

  @Mutation((returns) => LoginModel)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<LoginModel> {
    return this.usersService.login(loginInput);
  }

  // // call microservis
  // @Query((returns) => [ProductModel])
  // async getProducts(): Promise<Observable<any>> {
  //   return this.usersService.getProducts();
  // }

  @ResolveReference()
  async resolveReference(): Promise<UserModel[]> {
    return this.usersService.getUsers();
  }
}
