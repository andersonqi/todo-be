import { IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsUUID()
  @IsNotEmpty()
  readonly uuid: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly completed: boolean;
}
