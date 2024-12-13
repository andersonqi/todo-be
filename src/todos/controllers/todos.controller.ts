import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { TodosService } from '../services/todos.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() payload: CreateTodoDto): Promise<{ status: string }> {
    return this.todosService.create(payload);
  }

  @Get('users/:user_uuid')
  findByUsers(@Param('user_uuid') user_uuid: string): Promise<Todo[]> {
    return this.todosService.findByUser(user_uuid);
  }

  @Get(':uuid')
  findByUuid(@Param('uuid') uuid: string) {
    return this.todosService.findByUuid(uuid);
  }

  @Put()
  update(@Body() payload: UpdateTodoDto): Promise<{ status: string }> {
    return this.todosService.update(payload);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string): Promise<{ status: string }> {
    return this.todosService.remove(uuid);
  }
}
