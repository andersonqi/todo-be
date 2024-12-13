import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { MeDto, SignInDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(
    @Body() payload: SignInDto,
  ): Promise<{ status: string; uuid: string }> {
    const { uuid } = await this.authService.signIn(payload);

    return { status: 'ok', uuid: uuid };
  }

  @Post('me')
  getUser(@Body() payload: MeDto) {
    return this.authService.findUserByUuid(payload.uuid);
  }
}
