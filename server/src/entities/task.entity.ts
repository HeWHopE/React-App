import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { taskList } from './ltaskList.entity';

@Entity({ name: 'tasks' }) // Set entity name to 'tasks'
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false }) // Specify column type, length, and nullable constraint
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true }) // Specify column type and nullable constraint
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ type: 'date', nullable: true }) // Specify column type and nullable constraint
  @IsNotEmpty()
  @IsDateString()
  due_date: Date;

  @Column({ type: 'varchar', length: 15, nullable: false }) // Specify column type, length, and nullable constraint
  @IsNotEmpty()
  @IsString()
  priority: string;

  @Column({ type: 'int', nullable: false }) // Specify column type and nullable constraint
  list_id: number;

  @ManyToOne(() => taskList) // Specify ManyToOne relationship with TaskList entity
  @JoinColumn({ name: 'list_id' }) // Specify join column
  list: taskList;

  @Column({ type: 'varchar', length: 50, nullable: false }) // Specify column type, length, and nullable constraint
  @IsNotEmpty()
  @IsString()
  list_name: string;
}
