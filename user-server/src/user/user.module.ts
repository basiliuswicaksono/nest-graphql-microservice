import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { User } from './user.entity';
import { UsersResolver } from './user.resolver';
import { UsersService } from './user.service';

@Module({
  providers: [UsersResolver, UsersService, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret99',
      signOptions: {
        expiresIn: '3600s',
      },
    }),
    // ClientsModule.register([
    //   {
    //     name: 'PRODUCT',
    //     transport: Transport.TCP,
    //     options: { host: '127.0.0.1', port: 3002 },
    //   },
    // ]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
