import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignInDto } from '../dto/auth.dto';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(payload: SignInDto): Promise<{ status: string; uuid: string }> {
    try {
      const user = await this.usersService.findByUsername(payload.username);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isMatch = await bcrypt.compare(payload.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return {
        status: 'ok',
        uuid: user.uuid,
      };
    } catch (error) {
      throw error;
    }
  }

  async findUserByUuid(uuid: string) {
    return this.usersService.findByUuid(uuid);
  }
}
