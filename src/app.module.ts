import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { PurchaseController } from './purchase/purchase.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    CustomerModule,
    ProductModule,
    PurchaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'docker',
      password: 'docker',
      database: 'graphql',
      entities: ['dist/**/*.model.js'],
      synchronize: false,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController, PurchaseController],
  providers: [AppService],
})
export class AppModule {}
