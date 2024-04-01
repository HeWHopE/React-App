// list/list.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListController } from '../controllers/list.controller';
import { ListService } from '../services/list.service';
import { ActivityLogService } from '../services/activity-log.service';
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ListController],
  providers: [ListService, ActivityLogService],
})
export class ListModule {}
