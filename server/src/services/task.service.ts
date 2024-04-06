import { Injectable, BadRequestException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Task } from '../entities/task.entity' // Import the Task entity
import { ActivityLogService } from './activity-log.service'
import { ActivityLog } from '../entities/activity-log.entity'
import { CreateTaskDto } from 'src/dtos/taskDto.dto'
import { validate } from 'class-validator'
import { NotFoundException } from '@nestjs/common'

@Injectable()
export class TaskService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async getAllTasks(listId: number): Promise<Task[]> {
    try{

      return this.entityManager.query('SELECT * FROM tasks WHERE list_id = $1', [
        listId,
      ])

    } catch (error) {
      throw new Error('Failed to fetch tasks from the database')
    }

  }

  async getTask(id: number, listId: number): Promise<Task | undefined> {

    try 

    {
      const [task] = await this.entityManager.query(
        'SELECT * FROM tasks WHERE id = $1 AND list_id = $2',
        [id, listId],
      )

      return task
    } catch (error) {
      throw new Error('Failed to fetch task from the database')
    }
   
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    listId: number,
  ): Promise<Task> {

    try {

      const { name, description, due_date, priority } = createTaskDto

      const listQueryResult = await this.entityManager.query(
        'SELECT * FROM task_lists WHERE id = $1',
        [listId],
      )

      const list_name = listQueryResult[0].name

      const [newTask] = await this.entityManager.query(
        'INSERT INTO tasks (name, description, due_date, priority, list_id, list_name, board_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, description, due_date, priority, listId, list_name, listQueryResult[0].boardId]
      )

        try{
              const activityLog = new ActivityLog()
              activityLog.action_type = 'create'
              activityLog.action_description = `You added ${newTask.name} to the ${newTask.list_name}`
              activityLog.timestamp = new Date()
              activityLog.task_id = newTask.id
              activityLog.board_id = listQueryResult[0].boardId
              activityLog.list_id = listId
              await this.activityLogService.logActivity(activityLog)
        } catch (error) {
          throw new Error('Failed to log activity')
        }

      return newTask
    } catch (error) {
      throw new Error('Failed to create task in the database')
    }

  }

  async updateTask(
    id: number,
    listId: number,
    updatedTask: Task,
  ): Promise<Task | undefined> {

    try {
      const { name, description, due_date, priority, list_name } = updatedTask
  
      const existingTask = await this.getTask(id, listId)
  
      if (!existingTask || existingTask === updatedTask) {
        return
      }
  
      const updatedTaskOnlyDate = await this.entityManager.query(
        'UPDATE tasks SET due_date = $1  WHERE id = $2 AND list_id = $3 RETURNING *',
        [due_date, id, listId],
      )
  
      const existingDueDate = new Date(existingTask.due_date)
      const updatedDueDate = updatedTaskOnlyDate[0][0].due_date
  
      if (existingDueDate.getTime() === updatedDueDate.getTime()) {
      } else {
        const activityLog = new ActivityLog()
        activityLog.action_type = 'update'
        activityLog.action_description = `You updated the due date of ${existingTask.name}`
        activityLog.timestamp = new Date()
        activityLog.task_id = id
       activityLog.list_id = listId
        await this.activityLogService.logActivity(activityLog)
      }
  
      const logActivityIfChanged = async (
        propertyName: string,
        newValue: any,
        action_description: string,
      ) => {
        if (existingTask[propertyName] !== newValue) {
          const activityLog = new ActivityLog()
          activityLog.action_type = 'update'
          activityLog.action_description = action_description
          activityLog.timestamp = new Date()
          activityLog.task_id = id
          await this.activityLogService.logActivity(activityLog)
        }
      }
  
      await Promise.all([
        logActivityIfChanged(
          'description',
          updatedTask.description,
          `You updated the description of ${existingTask.name}`,
        ),
        logActivityIfChanged(
          'priority',
          updatedTask.priority,
          `You changed the priority ${existingTask.name} from ${existingTask.priority} to ${updatedTask.priority}`,
        ),
        logActivityIfChanged(
          'list_name',
          updatedTask.list_name,
          `You moved ${existingTask.name} from ${existingTask.list_name} to ${updatedTask.list_name}`,
        ),
        logActivityIfChanged(
          'name',
          updatedTask.name,
          `You renamed ${existingTask.name} to ${updatedTask.name}`,
        ),
      ])
  
      const [updatedTaskRecord] = await this.entityManager.query(
        'UPDATE tasks SET name = $1, description = $2, due_date = $3, priority = $4, list_name = $5 WHERE id = $6 AND list_id = $7 RETURNING *',
        [name, description, due_date, priority, list_name, id, listId],
      )
  
      return updatedTaskRecord} catch (error) {
      throw new Error('Failed to update task in the database')
      }

  }
  async deleteTask(id: number, listId: number): Promise<Task | undefined> {
    try {
      const chosenTask = await this.getTask(id, listId);

      await this.entityManager.query(
        'DELETE FROM activity_log WHERE task_id = $1',
        [id],
      );


  
      const [deletedTask] = await this.entityManager.query(
        'DELETE FROM tasks WHERE id = $1 AND list_id = $2 RETURNING *',
        [id, listId],
      );
    
      const activityLog = new ActivityLog();
      activityLog.action_type = 'delete';
      activityLog.action_description = `You deleted ${chosenTask.name} from the ${chosenTask.list_name}`;
      activityLog.timestamp = new Date();
      this.activityLogService.logActivity(activityLog);
  
      return deletedTask;
    } catch (error) {
      throw new Error('Failed to delete task from the database');
    }
  }
  

  async moveTask(
    id: number,
    listId: number,
    newListId: number,
  ): Promise<Task | undefined> {

    try {
      
    const task = await this.getTask(id, listId)
    if (!task) {
      throw new NotFoundException(
        `Task with ID ${id} in list with ID ${listId} not found.`,
      )
    }

    const [movedTask] = await this.entityManager.query(
      'UPDATE tasks SET list_id = $1 WHERE id = $2 AND list_id = $3 RETURNING *',
      [newListId, id, listId],
    )

    await this.entityManager.query(
      'UPDATE tasks SET list_name = (SELECT name FROM task_lists WHERE id = $1) WHERE id = $2',
      [newListId, id],
    )

    const [taskList] = await this.entityManager.query(
      'SELECT * FROM task_lists WHERE id = $1',
      [listId],
    )

    const [taskNewList] = await this.entityManager.query(
      'SELECT * FROM task_lists WHERE id = $1',
      [newListId],
    )

    const activityLog = new ActivityLog()
    activityLog.action_type = 'move'
    activityLog.action_description = `You moved ${task.name} from ${task.list_name} to ${taskNewList.name}`
    activityLog.timestamp = new Date()
    await this.activityLogService.logActivity(activityLog)
    return movedTask
    } catch (error) {
      throw new Error('Failed to move task in the database')
    }
  }
}
