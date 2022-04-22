import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UserModel } from './user.model';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './login.input';
import { LoginModel } from './login.model';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { ProductModel } from 'src/product/product.model';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService, // @Inject('PRODUCT') private readonly productClient: ClientProxy,
  ) {}

  async getUsers(): Promise<UserModel[]> {
    return this.userRepository.find();
  }

  async getUser(email: string): Promise<UserModel> {
    return this.userRepository.findOneBy({ email });
  }

  async register(registerInput: CreateUserInput): Promise<UserModel> {
    const { name, email, password, role, created_at, updated_at } =
      registerInput;

    const duplicateUser = await this.getUser(email);

    if (duplicateUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      user_id: uuid(),
      name,
      email,
      password: hashedPassword,
      role,
      created_at,
      updated_at,
    });

    const result: UserModel = await this.userRepository.save(newUser);

    return result;
  }

  async login(loginInput: LoginInput): Promise<LoginModel> {
    const { email, password } = loginInput;
    const user: User = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      interface JwtPayload {
        email: string;
        role: string;
      }
      const payload: JwtPayload = { email: user.email, role: user.role };
      const token: string = await this.jwtService.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  // async getProducts(): Promise<Observable<any>> {
  //   console.log('get_products');
  //   return this.productClient.send({ cmd: 'get_products_to_user' }, {});
  // }
}
