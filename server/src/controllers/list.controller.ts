import { Controller, Get, Post, Body , Delete, Param, Put} from '@nestjs/common';
import { ListService } from '../services/list.service';
import { List } from '../entities/list.entity';

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('list')
  async getAllTaskLists() {
    return this.listService.getAllTaskLists();
  }

  @Post('list')
  async createTaskList(@Body() createListDto: List) {
    return this.listService.createTaskList(createListDto);
  }

@Delete('list/:id')
  async deleteTaskList(@Param('id') id: number) { 
    return this.listService.deleteTaskList(id);
  }

@Put('list/:id')
  async updateTaskList(@Param('id') id: number, @Body() list: List) {
    return this.listService.updateTaskList(id, list);
  }

}