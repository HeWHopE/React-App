import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common'

import { BoardService } from 'src/services/board.service'

import { Board } from 'src/entities/Board.entity'
import { get } from 'http'

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('board')
  async getAllTaskLists() {
    return this.boardService.getAllBoards()
  }

  @Get('board/:id')
  async getBoardByID(@Param('id') id: number) {
    return this.boardService.getBoardById(id)
  }

  @Post('board')
  async createBoard(@Body() board: Board) {
    return this.boardService.createBoard(board)
  }

  @Put('board/:id')
  async updateBoard(@Param('id') id: number, @Body() board: Board) {
    return this.boardService.updateBoard(id, board)
  }

  @Delete('board/:id')
  async deleteBoard(@Param('id') id: number) {
    return this.boardService.deleteBoard(id)
  }
}
