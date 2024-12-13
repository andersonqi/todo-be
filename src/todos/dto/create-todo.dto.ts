import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTodoDto {
  @IsUUID()
  @IsNotEmpty()
  readonly user_uuid: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
