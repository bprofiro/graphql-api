import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field()
  readonly content: string;
  @Field()
  readonly user_id: string;
}

@InputType()
export class DeleteMessageInput {
  @Field()
  readonly id: string;
}
