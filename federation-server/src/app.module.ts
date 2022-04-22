import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://localhost:3001/graphql' },
            { name: 'product', url: 'http://localhost:3002/graphql' },
            { name: 'order', url: 'http://localhost:3003/graphql' },
          ],
        }),
      },
    }),
    // ClientsModule.register([
    //   {
    //     name: 'USER',
    //     transport: Transport.TCP,
    //     options: { port: 3001 },
    //   },
    //   {
    //     name: 'PRODUCT',
    //     transport: Transport.TCP,
    //     options: { port: 3002 },
    //   },
    //   // {
    //   //   name: 'ORDER',
    //   //   transport: Transport.TCP,
    //   //   options: { port: 3003 },
    //   // },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
