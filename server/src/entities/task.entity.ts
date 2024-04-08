import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator'
import { TaskList } from './taskList.entity'
import { Board } from './Board.entity' // Import the Board entity

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string

  @Column({ type: 'text', nullable: true })
  @IsOptional() // Make the property optional
  @IsString() // Add a custom message for validation error
  description?: string | null

  @Column({ type: 'date', nullable: true })
  @IsOptional() // Make the property optional
  @IsDateString() // Add a custom message for validation error
  due_date?: Date | null

  @Column({ type: 'varchar', length: 15, nullable: true })
  @IsOptional() // Make the property optional
  @IsString() // Add a custom message for validation error
  priority?: string | null

  @ManyToOne(() => TaskList)
  @JoinColumn({ name: 'list_id' })
  list: TaskList

  @ManyToOne(() => Board) // Define ManyToOne relationship with Board
  @JoinColumn({ name: 'board_id' }) // Specify join column
  board: Board // Define the board property

  @Column({ type: 'varchar', length: 50, nullable: true })
  list_name: string
}
