import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { List } from '../entities/list.entity';

@Injectable()
export class ListService {
  constructor(private readonly entityManager: EntityManager) {}


  async getAllTaskLists() {
    try {
      console.log();

      const taskLists = await this.entityManager.query(
        'SELECT * FROM task_lists ORDER BY id;',
      );
      return taskLists;
    } catch (error) {
      // Handle database query errors
      throw new Error('Failed to fetch task lists from the database');
    }
  }

  async createTaskList(createListDto: List) {
    try {
      const { name } = createListDto;
      const newList = await this.entityManager.query(
        'INSERT INTO task_lists (name) VALUES ($1)',
        [name],
      );
      return newList;
    } catch (error) {
      // Handle database insertion errors
      throw new Error('Failed to create task list in the database');
    }
  }

  async deleteTaskList(id: number) {
    try {
        const deletedList = await this.entityManager.query(
            'DELETE FROM task_lists WHERE id = $1 RETURNING *', 
            [id],
        );
        if (deletedList && deletedList.length > 0) {
            return deletedList[0]; 
        } else {
            throw new Error('Task list with the provided ID does not exist');
        }
    } catch (error) {
        throw new Error('Failed to delete task list from the database');
    }
}


  async updateTaskList(id: number, list: List) {
      try {
          const { name } = list;
          const updatedList = await this.entityManager.query(
              'UPDATE task_lists SET name = $1 WHERE id = $2 RETURNING *',
              [name, id],
          );
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
