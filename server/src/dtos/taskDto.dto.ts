// create-task.dto.ts
import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  due_date?: Date

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  priority?: string
}
