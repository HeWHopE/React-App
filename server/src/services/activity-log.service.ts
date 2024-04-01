import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ActivityLog } from 'src/entities/activity-log.entity';

@Injectable()
export class ActivityLogService {
  constructor(private readonly entityManager: EntityManager) {}

  async logActivity(activityLog: ActivityLog) {
    try {
      const { actionType, actionDescription, fromColumn, toColumn, task_id } =
        activityLog;

      const query = `
        INSERT INTO activity_log (action_type, action_description, from_column, to_column, task_id)
        VALUES ($1, $2, $3, $4, $5)
      `;

      await this.entityManager.query(query, [
        actionType,
        actionDescription,
        fromColumn,
        toColumn,
        task_id,
      ]);
    } catch (error) {
      // Handle error
      console.error('Error logging activity:', error);
      throw new Error('Failed to log activity');
    }
  }

  async getActivityLogs() {
    try {
      return await this.entityManager.query(
        'SELECT * FROM activity_log ORDER BY timestamp DESC LIMIT 10',
      );
    } catch (error) {
      // Handle error
      console.error('Error fetching activity logs:', error);
      throw new Error('Failed to fetch activity logs');
    }
  }
}
