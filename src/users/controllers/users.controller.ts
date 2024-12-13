import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() payload: CreateUserDto): Promise<{ status: string }> {
    return this.usersService.create(payload);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  findByUuid(@Param('uuid') uuid: string): Promise<User> {
    return this.usersService.findByUuid(uuid);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string): Promise<{ status: string }> {
    return this.usersService.remove(uuid);
  }
}
