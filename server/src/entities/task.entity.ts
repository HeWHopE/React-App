import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ name: 'due_date', type: 'date' })
  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @Column()
  @IsNotEmpty()
  @IsString()
  priority: string;


  @Column({ nullable: true }) // Marking it nullable allows the column to have NULL values
  list_name?: string;
  
}
