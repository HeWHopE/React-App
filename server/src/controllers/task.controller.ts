import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../entities/task.entity';
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('task')
  async getAllTasks(@Query('listId') listId: number) {
    return this.taskService.getAllTasks(listId);
  }

  @Get('task/:id')
  async getTaskListById(@Param('id') id: number, @Query('listId') listId: number) {
    return this.taskService.getTask(id, listId);
  }
  
  @Post('task')
  async createTask(@Body() task: Task, @Query('listId') listId: number) {
    return this.taskService.createTask(task, listId);
  }

  @Put('task/:id')
    async updateTask(
        @Param('id') id: number,
        @Query('listId') listId: number,
        @Body() task: Task
    ) {
        return this.taskService.updateTask(id, listId, task);
    }

    @Put('moveTask/:id')
    async moveTask(
        @Param('id') id: number,
        @Query('listId') listId: number,
        @Query('newListId') newListId: number
    ) {
        return this.taskService.moveTask(id, listId, newListId);
    }

    @Delete('task/:id')
    async deleteTask(
        @Param('id') id: number,
        @Query('listId') listId: number
    ) {
        return this.taskService.deleteTask(id, listId);
    }



}
