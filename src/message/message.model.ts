import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
@Entity({ name: 'messages' })
export class Message {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column({ name: 'user_id' })
  user_id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
