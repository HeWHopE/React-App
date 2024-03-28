// task/task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';
import { ListModule } from './list.module'; // Adjust module name and path
import { ListService } from '../services/list.service'; // Adjust module name and path
import { ActivityLogService } from '../services/activity-log.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    ListModule, 
  ],
  controllers: [TaskController],
  providers: [TaskService, ListService, ActivityLogService],
})
export class TaskModule {}
