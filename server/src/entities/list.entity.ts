import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsNotEmpty, IsString } from 'class-validator'
@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  @IsNotEmpty()
  @IsString()
  name: string
}
