import { Controller, Get } from '@nestjs/common';
import { ActivityLogService } from '../services/activity-log.service';
import { ActivityLog } from '../entities/activity-log.entity';

@Controller()
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get('activity')
  async getActivityLogs(): Promise<ActivityLog[]> {
    return this.activityLogService.getActivityLogs();
  }
}
