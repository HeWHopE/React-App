import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Task } from './task.entity'; // Import Task entity

@Entity({ name: 'task_lists' }) // Set entity name to 'task_lists'
export class taskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false }) // Specify column type, length, and nullable constraint
  @IsNotEmpty()
  @IsString()
  name: string;

}
