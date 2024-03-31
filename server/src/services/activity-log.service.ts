import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ActivityLog } from 'src/entities/activity-log.entity';

@Injectable()
export class ActivityLogService {
  constructor(private readonly entityManager: EntityManager) {}

  async logActivity(activityLog: ActivityLog) {
    const { actionType, actionDescription, fromColumn, toColumn } = activityLog;
  
    const query = `
      INSERT INTO activity_log (action_type, action_description, from_column, to_column)
      VALUES ($1, $2, $3, $4)
    `;
  
    await this.entityManager.query(query, [actionType, actionDescription, fromColumn, toColumn]);
  }

  async getActivityLogs() {
    return this.entityManager.query('SELECT * FROM activity_log ORDER BY timestamp DESC LIMIT 10');
  }

}


