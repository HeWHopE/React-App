import { Controller, Get, Param } from '@nestjs/common'
import { ActivityLogService } from '../services/activity-log.service'
import { ActivityLog } from '../entities/activity-log.entity'

@Controller()
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get('activity')
  async getActivityLogs(): Promise<ActivityLog[]> {
    return this.activityLogService.getActivityLogs()
  }

  @Get('activity/:boardId')
  async getActivityLogsByBoardId(
    @Param('boardId') boardId: number,
  ): Promise<ActivityLog[]> {
    return this.activityLogService.getActivityLogsByBoardId(boardId)
  }
}
