import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  readonly email: string;
  @Field()
  readonly name: string;
}
