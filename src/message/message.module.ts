import { Message } from './message.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { UserModule } from './../user/user.module';

import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Message])],
  providers: [MessageService, MessageResolver],
  exports: [MessageService],
})
export class MessageModule {}
