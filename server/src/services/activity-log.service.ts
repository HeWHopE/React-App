import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ActivityLog } from 'src/entities/activity-log.entity';


const query = `
        INSERT INTO activity_log (action_type, action_description, timestamp, task_id, board_id, list_id)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;


@Injectable()
export class ActivityLogService {
  constructor(private readonly entityManager: EntityManager) {}

  async logActivity(activityLog: ActivityLog) {
    try {
      const { action_type, action_description, timestamp, task_id, board_id, list_id } = activityLog;
  

      if(task_id) {
      const [task] = await this.entityManager.query(`SELECT * FROM tasks WHERE id = $1`, [task_id]);

      await this.entityManager.query(query, [
        action_type,
        action_description,
        timestamp,
        task_id,
        task.board_id, 
        list_id
      ]);
      }


      await this.entityManager.query(query, [
        action_type,
        action_description,
        timestamp,
        task_id,
        board_id,
        list_id ? list_id : null
      ]);

      
  
     
    } catch (error) {
      
      console.error('Error logging activity:', error);
      throw new Error('Failed to log activity');
    }
  }
  

  async getActivityLogs() {
    try {

      console.log("Baited")

      return await this.entityManager.query(
        'SELECT * FROM activity_log ORDER BY timestamp DESC LIMIT 10',
      );
    } catch (error) {
      // Handle error
      console.error('Error fetching activity logs:', error);
      throw new Error('Failed to fetch activity logs');
    }
  }

  async getActivityLogsByBoardId(boardId: number) {
    try {

      console.log(boardId)


      return await this.entityManager.query(
        'SELECT * FROM activity_log WHERE board_id = $1 ORDER BY timestamp DESC',
        [boardId],
      );
    } catch (error) {
      // Handle error
      console.error('Error fetching activity logs:', error);
      throw new Error('Failed to fetch activity logs');
    }
  }


}
