// list/list.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActivityLogController } from 'src/controllers/activity-log.controller'
import { ActivityLogService } from 'src/services/activity-log.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
})
export class ActivityLogModule {}
