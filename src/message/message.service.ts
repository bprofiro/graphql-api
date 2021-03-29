import { Injectable } from '@nestjs/common';
import { Message } from './message.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageInput, DeleteMessageInput } from './message.input';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  create(data: MessageInput): Promise<Message> {
    return this.messageRepository.save(data);
  }

  async delete(data: DeleteMessageInput): Promise<void> {
    const message = await this.messageRepository.findOne(data.id);

    if (!message) {
      throw new Error('This message does not exists');
    }

    this.messageRepository.delete(message);
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  findByUser(id: string): Promise<Message[]> {
    return this.messageRepository.find({ where: { user_id: id } });
  }

  findOne(id: string): Promise<Message> {
    return this.messageRepository.findOne(id);
  }
}
