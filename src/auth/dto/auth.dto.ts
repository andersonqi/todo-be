import { IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class MeDto {
  @IsString()
  @IsNotEmpty()
  readonly uuid: string;
}
