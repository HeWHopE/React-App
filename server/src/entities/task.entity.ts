import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { TaskList } from './taskList.entity';
import { Board } from './Board.entity'; // Import the Board entity

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ type: 'date', nullable: true })
  @IsNotEmpty()
  @IsDateString()
  due_date: Date;

  @Column({ type: 'varchar', length: 15, nullable: false })
  @IsNotEmpty()
  @IsString()
  priority: string;

  @ManyToOne(() => TaskList)
  @JoinColumn({ name: 'list_id' })
  list: TaskList;

  @ManyToOne(() => Board) // Define ManyToOne relationship with Board
  @JoinColumn({ name: 'board_id' }) // Specify join column
  board: Board; // Define the board property

  @Column({ type: 'varchar', length: 50, nullable: true })
  list_name: string;
}
