import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(payload: CreateUserDto): Promise<{ status: string }> {
    try {
      const newUser = this.usersRepo.create({
        ...payload,
        password: await bcrypt.hash(payload.password, 10),
      });

      await this.usersRepo.save(newUser);

      return {
        status: 'ok',
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepo.find();

    return plainToInstance(User, users);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({ username });
    return user;
  }

  async findByUuid(uuid: string): Promise<User> {
    const user = await this.usersRepo.findOneByOrFail({ uuid });

    return plainToInstance(User, user);
  }

  async remove(uuid: string): Promise<{ status: string }> {
    try {
      const user = await this.findByUuid(uuid);

      await this.usersRepo.softRemove(user);

      return {
        status: 'ok',
      };
    } catch (error) {
      throw error;
    }
  }
}
