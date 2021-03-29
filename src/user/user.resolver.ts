import {
  Resolver,
  Args,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Message } from './../message/message.model';
import { MessageService } from './../message/message.service';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserInput } from './user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(MessageService) private messageService: MessageService,
  ) {}

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @ResolveField(() => [Message])
  async messages(@Parent() user) {
    const { id } = user;
    console.log(user);
    return this.messageService.findByUser(id);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserInput): Promise<User> {
    return await this.userService.create(data);
  }
}
