import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Query,
} from '@nestjs/common'
import { ListService } from '../services/list.service'
import { TaskList } from '../entities/taskList.entity'

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('list')
  async getAllTaskLists() {
    return this.listService.getAllTaskLists()
  }

  @Get('list/:id')
  async getTaskListById(@Param('id') id: number) {
    return this.listService.getTaskListById(id)
  }


  @Get('list/board/:boardId')
  async getTaskListByBoardId(@Param('boardId') boardId: number) {
    return this.listService.getTaskListByBoardId(boardId)
  }



  @Post('list')
  async createTaskList(
    @Body() createListDto: TaskList,
    @Query('boardId') boardId: number,
  ) {
    return this.listService.createTaskList(createListDto, boardId)
  }

  @Delete('list/:id')
  async deleteTaskList(@Param('id') id: number) {
    return this.listService.deleteTaskList(id)
  }

  @Put('list/:id')
  async updateTaskList(@Param('id') id: number, @Body() list: TaskList) {
    return this.listService.updateTaskList(id, list)
  }
}
