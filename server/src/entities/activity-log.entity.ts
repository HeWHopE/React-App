import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  actionType: string

  @Column()
  actionDescription: string

  @Column({ nullable: true })
  fromColumn: string

  @Column({ nullable: true })
  toColumn: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date

  @Column({ nullable: true })
  task_id: number
}
