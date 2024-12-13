import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
    private readonly usersService: UsersService,
  ) {}

  async create(payload: CreateTodoDto): Promise<{ status: string }> {
    try {
      const user = await this.usersService.findByUuid(payload.user_uuid);

      const newTodo = this.todoRepo.create({
        ...payload,
        user,
      });

      await this.todoRepo.save(newTodo);

      return {
        status: 'ok',
      };
    } catch (error) {
      throw error;
    }
  }

  findByUser(user_uuid: string): Promise<Todo[]> {
    return this.todoRepo.find({
      where: {
        user: {
          uuid: user_uuid,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findByUuid(uuid: string): Promise<Todo> {
    return this.todoRepo.findOneByOrFail({ uuid });
  }

  async update(payload: UpdateTodoDto): Promise<{ status: string }> {
    try {
      const todo = await this.findByUuid(payload.uuid);

      await this.todoRepo.update(todo.id, {
        completed: payload.completed,
      });

      return {
        status: 'ok',
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(uuid: string): Promise<{ status: string }> {
    try {
      const todo = await this.findByUuid(uuid);

      await this.todoRepo.softRemove(todo);

      return {
        status: 'ok',
      };
    } catch (error) {
      throw error;
    }
  }
}
