import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { taskList } from '../entities/ltaskList.entity';
import { ActivityLogService } from './activity-log.service';
import { ActivityLog } from '../entities/activity-log.entity';

@Injectable()
export class ListService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async getTaskListById(id: number) {
    try {
      const [taskList] = await this.entityManager.query(
        'SELECT * FROM task_lists WHERE id = $1',
        [id],
      );

      if (taskList) {
        return taskList;
      } else {
        throw new NotFoundException(
          'Task list with the provided ID does not exist',
        );
      }
    } catch (error) {
      throw new Error('Failed to fetch task list from the database');
    }
  }

  async getAllTaskLists() {
    try {
      const taskLists = await this.entityManager.query(
        'SELECT * FROM task_lists ORDER BY id;',
      );
      return taskLists;
    } catch (error) {
      throw new Error('Failed to fetch task lists from the database');
    }
  }

  async createTaskList(createListDto: taskList) {
    try {
      const { name } = createListDto;
      const newList = await this.entityManager.query(
        'INSERT INTO task_lists (name) VALUES ($1)',
        [name],
      );

      try {
        const activityLog = new ActivityLog();
        activityLog.action_type = 'create';
        activityLog.action_description = `You added new list:  ${name}`;
        activityLog.timestamp = new Date();

        await this.activityLogService.logActivity(activityLog);
      } catch (error) {
        throw new Error('Failed to log activity');
      }

      return newList;
    } catch (error) {
      throw new Error('Failed to create task list in the database');
    }
  }

  async deleteTaskList(id: number) {
    try {
      const deletedList = await this.entityManager.query(
        'DELETE FROM task_lists WHERE id = $1 RETURNING *',
        [id],
      );

      try {
        const activityLog = new ActivityLog();
        activityLog.action_type = 'remove';
        activityLog.action_description = `You removed list: ${deletedList[0][0].name}`;
        activityLog.timestamp = new Date();
        await this.activityLogService.logActivity(activityLog);
      } catch (error) {
        throw new Error('Failed to log activity');
      }

      if (deletedList && deletedList.length > 0) {
        return deletedList[0];
      } else {
        throw new Error('Task list with the provided ID does not exist');
      }
    } catch (error) {
      throw new Error('Failed to delete task list from the database');
    }
  }

  async updateTaskList(id: number, list: taskList) {
    try {
      const { name } = list;

      const taskList = await this.getTaskListById(id);

      const updatedList = await this.entityManager.query(
        'UPDATE task_lists SET name = $1 WHERE id = $2 RETURNING *',
        [name, id],
      );

      try {
        const activityLog = new ActivityLog();
        activityLog.action_type = 'update';
        activityLog.action_description = `You updated name from: "${taskList.name}" to "${updatedList[0][0].name}"`;
        activityLog.timestamp = new Date();
        await this.activityLogService.logActivity(activityLog);
      } catch (error) {
        throw new Error('Failed to log activity');
      }

      if (updatedList && updatedList.length > 0) {
        return updatedList[0];
      } else {
        throw new Error('Task list with the provided ID does not exist');
      }
    } catch (error) {
      throw new Error('Failed to update task list in the database');
    }
  }
}
