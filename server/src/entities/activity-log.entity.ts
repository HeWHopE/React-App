import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'
import { Task } from './task.entity' // Import Task entity
import { Board } from './Board.entity' // Import Board entity

@Entity({ name: 'activity_log' }) // Set entity name to 'activity_log'
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50, nullable: false }) // Specify column type, length, and nullable constraint
  @IsNotEmpty()
  @IsString()
  action_type: string

  @Column({ type: 'text', nullable: true }) // Specify column type and nullable constraint
  @IsOptional()
  @IsString()
  action_description: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Specify column type and default value
  timestamp: Date

  @Column({ type: 'int', nullable: true }) // Specify column type and nullable constraint
  task_id: number

  @Column({ type: 'int', nullable: true }) // Specify column type and nullable constraint
  board_id: number

  @ManyToOne(() => Board) // Define ManyToOne relationship with Board
  @JoinColumn({ name: 'board_id' }) // Specify join column
  board: Board // Define the board property

  @Column({ type: 'int', nullable: true }) // Specify column type and nullable constraint
  list_id: number
}
