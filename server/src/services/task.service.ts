import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Task } from '../entities/task.entity'; // Import the Task entity
import { ActivityLogService } from './activity-log.service'; 
import { ActivityLog } from '../entities/activity-log.entity';
import { CreateTaskDto } from 'src/dtos/taskDto.dto';
import { validate } from 'class-validator';
import { NotFoundException } from '@nestjs/common';




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

  async createTask(createTaskDto: CreateTaskDto, listId: number): Promise<Task> {
    const { name, description, due_date, priority } = createTaskDto;
    
    // Validate the createTaskDto
    const errors = await validate(createTaskDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    // Retrieve the list name based on the listId
    const listQueryResult = await this.entityManager.query(
      'SELECT name FROM task_lists WHERE id = $1',
      [listId]
    );
    const list_name = listQueryResult[0].name;
    
    // Insert the new task into the database
    const [newTask] = await this.entityManager.query(
      'INSERT INTO tasks (name, description, due_date, priority, list_id, list_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, due_date, priority, listId, list_name]
    );

    // Log the activity
    const activityLog = new ActivityLog();
    activityLog.actionType = 'create';
    activityLog.actionDescription = `You added ${newTask.name} to the ${newTask.list_name}`;
    activityLog.timestamp = new Date();
    await this.activityLogService.logActivity(activityLog);

    return newTask;
}



    async updateTask(id: number, listId: number, updatedTask: Task): Promise<Task | undefined> {
      const { name, description, due_date, priority, list_name } = updatedTask;

     
    const existingTask = await this.getTask(id, listId);

      console.log(typeof existingTask.list_name, 'existingTask.list_name');
      console.log(typeof updatedTask.list_name, 'updatedTask.list_name');

      console.log('existingTask', existingTask);
      console.log('updatedTask', updatedTask);
      
    if (!existingTask || existingTask === updatedTask) {
        return;
    }
    
  const updatedTaskOnlyDate = await this.entityManager.query(
    'UPDATE tasks SET due_date = $1  WHERE id = $2 AND list_id = $3 RETURNING *',
    [due_date, id, listId]
  );
  
  const existingDueDate = new Date(existingTask.due_date);
  const updatedDueDate = updatedTaskOnlyDate[0][0].due_date;

  if (existingDueDate.getTime() === updatedDueDate.getTime()) {
    console.log('Date not changed here');
  } else {
    const activityLog = new ActivityLog();
    activityLog.actionType = 'update';
    activityLog.actionDescription = `You updated the due date of ${existingTask.name}`;
    activityLog.timestamp = new Date();
    await this.activityLogService.logActivity(activityLog);
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
        logActivityIfChanged('priority', updatedTask.priority, `You changed the priority ${existingTask.name} from ${existingTask.priority} to ${updatedTask.priority}`),
        logActivityIfChanged('list_name', updatedTask.list_name, `You moved ${existingTask.name} from ${existingTask.list_name} to ${updatedTask.list_name}`),
        logActivityIfChanged('name', updatedTask.name, `You renamed ${existingTask.name} to ${updatedTask.name}`),
    ]); 

    const [updatedTaskRecord] = await this.entityManager.query(
        'UPDATE tasks SET name = $1, description = $2, due_date = $3, priority = $4, list_name = $5 WHERE id = $6 AND list_id = $7 RETURNING *',
        [name, description, due_date, priority, list_name, id, listId]
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


  async moveTask (id: number, listId: number, newListId: number): Promise<Task | undefined> {
    const task = await this.getTask(id, listId);

    console.log('here we are');

    console.log('task', task);

    console.log('listId', listId);
    console.log('newListId', newListId);


    if (!task) {
      throw new NotFoundException(`Task with ID ${id} in list with ID ${listId} not found.`);
  }


    const [movedTask] = await this.entityManager.query(
      'UPDATE tasks SET list_id = $1 WHERE id = $2 AND list_id = $3 RETURNING *',
      [newListId, id, listId]
    );

    await this.entityManager.query(
      'UPDATE tasks SET list_name = (SELECT name FROM task_lists WHERE id = $1) WHERE id = $2',
      [newListId, id]
  );

    const [taskList] = await this.entityManager.query(
      'SELECT * FROM task_lists WHERE id = $1',
      [listId],
    );

    const [taskNewList] = await this.entityManager.query(
      'SELECT * FROM task_lists WHERE id = $1',
      [newListId],
    );


    const activityLog = new ActivityLog();
    activityLog.actionType = 'move';
    activityLog.actionDescription = `You moved ${task.name} from ${task.list_name} to ${ taskNewList.name}`;
    activityLog.timestamp = new Date();
    await this.activityLogService.logActivity(activityLog);

    return movedTask;
  }
}
