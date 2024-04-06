import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { TaskList } from './taskList.entity'; // Assuming TaskList is the correct name of your entity

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @OneToMany(() => TaskList, taskList => taskList.board)
  lists: TaskList[];
}
