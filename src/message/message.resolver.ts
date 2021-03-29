import {
  Resolver,
  Args,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { User } from './../user/user.model';

import { MessageService } from './message.service';
import { Message } from './message.model';
import { MessageInput } from './message.input';

@Resolver(() => Message)
export class MessageResolver {
  constructor(@Inject(MessageService) private messageservice: MessageService) {}

  @Query(() => Message)
  async message(@Args('id') id: string): Promise<Message> {
    return await this.messageservice.findOne(id);
  }

  @ResolveField(() => User)
  async user(@Parent() message) {
    const { user_id } = message;
    return this.messageservice.findByUser(user_id);
  }

  @Query(() => [Message])
  async messages(): Promise<Message[]> {
    return await this.messageservice.findAll();
  }

  @Mutation(() => Message)
  async createMessage(
    @Args('message') message: MessageInput,
  ): Promise<Message> {
    return await this.messageservice.create(message);
  }
}
