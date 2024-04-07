import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { TaskList } from '../entities/taskList.entity'
import { ActivityLogService } from './activity-log.service'
import { ActivityLog } from '../entities/activity-log.entity'
import { Task } from '../entities/task.entity'

@Injectable()
export class ListService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async getTaskListById(id: number) {
    try {
      const [TaskList] = await this.entityManager.query(
        'SELECT * FROM task_lists WHERE id = $1',
        [id],
      )

      if (TaskList) {
        return TaskList
      } else {
        throw new NotFoundException(
          'Task list with the provided ID does not exist',
        )
      }
    } catch (error) {
      throw new Error('Failed to fetch task list from the database')
    }
  }

  async getAllTaskLists() {
    try {
      const TaskLists = await this.entityManager.query(
        'SELECT * FROM task_lists ORDER BY id;',
      )
      return TaskLists
    } catch (error) {
      throw new Error('Failed to fetch task lists from the database')
    }
  }

  async getTaskListByBoardId(boardId: number) {
    try {
      const TaskLists = await this.entityManager.query(
        'SELECT * FROM task_lists WHERE "boardId" = $1',
        [Number(boardId)],
      )

      return TaskLists
    } catch (error) {
      throw new Error('Failed to fetch task lists from the database')
    }
  }

  async createTaskList(createListDto: TaskList, boardId: number) {
    try {
      const { name } = createListDto

      const newList = await this.entityManager.query(
        'INSERT INTO task_lists (name, "boardId") VALUES ($1, $2) RETURNING *',
        [name, boardId],
      )

      try {
        const activityLog = new ActivityLog()
        activityLog.action_type = 'create'
        activityLog.action_description = `You added new list:  ${name}`
        activityLog.timestamp = new Date()
        activityLog.board_id = boardId
        activityLog.list_id = newList[0].id
        await this.activityLogService.logActivity(activityLog)
      } catch (error) {
        throw new Error('Failed to log activity')
      }

      return newList
    } catch (error) {
      throw new Error('Failed to create task list in the database')
    }
  }

  async deleteTaskList(id: number) {
    try {
      const [list] = await this.entityManager.query(
        'SELECT * FROM task_lists WHERE id = $1',
        [id],
      )

      await this.entityManager.query(
        'DELETE FROM activity_log WHERE list_id = $1',
        [id],
      )

      await this.entityManager.query('DELETE FROM tasks WHERE list_id = $1', [
        id,
      ])

      const deletedList = await this.entityManager.query(
        'DELETE FROM task_lists WHERE id = $1 RETURNING *',
        [id],
      )

      try {
        const activityLog = new ActivityLog()
        activityLog.action_type = 'remove'
        activityLog.action_description = `You removed list: ${deletedList[0][0].name}`
        activityLog.timestamp = new Date()
        activityLog.board_id = deletedList[0][0].boardId
        await this.activityLogService.logActivity(activityLog)
      } catch (error) {
        throw new Error('Failed to log activity')
      }

      if (deletedList && deletedList.length > 0) {
        return deletedList[0]
      } else {
        throw new Error('Task list with the provided ID does not exist')
      }
    } catch (error) {
      throw new Error('Failed to delete task list from the database')
    }
  }

  async updateTaskList(id: number, name: string) {
    try {
      const TaskList = await this.getTaskListById(id)

      const updatedList = await this.entityManager.query(
        'UPDATE task_lists SET name = $1 WHERE id = $2 RETURNING *',
        [name, id],
      )

      try {
        const activityLog = new ActivityLog()
        activityLog.action_type = 'update'
        activityLog.action_description = `You updated name from: "${TaskList.name}" to "${updatedList[0][0].name}"`
        activityLog.timestamp = new Date()
        await this.activityLogService.logActivity(activityLog)
      } catch (error) {
        throw new Error('Failed to log activity')
      }

      if (updatedList && updatedList.length > 0) {
        return updatedList[0]
      } else {
        throw new Error('Task list with the provided ID does not exist')
      }
    } catch (error) {
      throw new Error('Failed to update task list in the database')
    }
  }
}
