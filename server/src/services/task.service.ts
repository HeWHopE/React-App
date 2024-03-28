import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Task } from '../entities/task.entity'; // Import the Task entity
import { ActivityLogService } from './activity-log.service'; 
import { ActivityLog } from '../entities/activity-log.entity';
@Injectable()
export class TaskService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly activityLogService: ActivityLogService
      ) {}

  async getAllTasks(listId: number): Promise<Task[]> {
    return this.entityManager.query('SELECT * FROM tasks WHERE list_id = $1', [listId]);
  }

  async getTask(id: number, listId: number): Promise<Task | undefined> {
    const [task] = await this.entityManager.query('SELECT * FROM tasks WHERE id = $1 AND list_id = $2', [id, listId]);
    return task;
  }

  async createTask(task: Task, listId: number): Promise<Task> {
    const { name, description, dueDate, priority } = task; 

    const listQueryResult = await this.entityManager.query(
      'SELECT name FROM task_lists WHERE id = $1',
      [listId]
  );
  

  const list_name = listQueryResult[0].name;

       const [newTask] = await this.entityManager.query(
        'INSERT INTO tasks (name, description, due_date, priority, list_id, list_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, description, dueDate, priority, listId, list_name]
    );

    const activityLog = new ActivityLog();
    activityLog.actionType = 'create';
    activityLog.actionDescription = `You added ${newTask.name} to the ${newTask.column_name}`;
    activityLog.timestamp = new Date();

    return newTask;

  }


    async updateTask(id: number, listId: number, updatedTask: Task): Promise<Task | undefined> {
    const existingTask = await this.getTask(id, listId);



    if (!existingTask || existingTask === updatedTask) {
        return;
    }

    const logActivityIfChanged = async (propertyName: string, newValue: any, actionDescription: string) => {
        if (existingTask[propertyName] !== newValue) {
            const activityLog = new ActivityLog();
            activityLog.actionType = 'update';
            activityLog.actionDescription = actionDescription;
            activityLog.timestamp = new Date();
            await this.activityLogService.logActivity(activityLog);
        }
    };

    await Promise.all([
        
        logActivityIfChanged('description', updatedTask.description, `You updated the description of ${existingTask.name}`),
        logActivityIfChanged('dueDate', updatedTask.dueDate, `You updated the due date of ${existingTask.name}`),
        logActivityIfChanged('priority', updatedTask.priority, `You changed the priority ${existingTask.name} from ${existingTask.priority} to ${updatedTask.priority}`),
        logActivityIfChanged('listName', updatedTask.list_name, `You moved ${existingTask.name} from ${existingTask.list_name} to ${updatedTask.list_name}`),
        logActivityIfChanged('name', updatedTask.name, `You renamed ${existingTask.name} to ${updatedTask.name}`),
    ]); 

    const { name, description, dueDate, priority, list_name } = updatedTask;
    const [updatedTaskRecord] = await this.entityManager.query(
        'UPDATE tasks SET name = $1, description = $2, due_date = $3, priority = $4, column_name = $5 WHERE id = $6 AND list_id = $7 RETURNING *',
        [name, description, dueDate, priority, list_name, id, listId]
    );

    return updatedTaskRecord;
}
  
  async deleteTask(id: number, listId: number): Promise<Task | undefined> {
    const chosenTask = await this.getTask(id, listId);
    const [deletedTask] = await this.entityManager.query('DELETE FROM tasks WHERE id = $1 AND list_id = $2 RETURNING *', [id, listId]);

    const activityLog = new ActivityLog();

    activityLog.actionType = 'delete';
    activityLog.actionDescription = `You deleted  ${chosenTask.name} from the ${chosenTask.list_name}`;

    activityLog.timestamp = new Date();

    this.activityLogService.logActivity(activityLog);

    return deletedTask;
  }
}