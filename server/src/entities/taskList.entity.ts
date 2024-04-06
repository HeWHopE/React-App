import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Board } from './Board.entity'; // Import Board entity

@Entity({ name: 'task_lists' }) // Set entity name to 'task_lists'
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false }) // Specify column type, length, and nullable constraint
  @IsNotEmpty()
  @IsString()
  name: string;

  @ManyToOne(() => Board, board => board.lists) 
  board: Board;
}
