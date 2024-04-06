import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { Board } from 'src/entities/Board.entity'

@Injectable()
export class BoardService {
  constructor(private readonly entityManager: EntityManager) {}

  async getAllBoards(): Promise<Board[]> {
    try {
      const Boards = await this.entityManager.query('SELECT * FROM boards;')

      return Boards
    } catch (error) {
      throw new Error('Failed to fetch boards from the database')
    }
  }

  async getBoardById(id: number): Promise<Board> {
    try {
      // Fetch the board details along with associated lists using a custom query
      const queryResult = await this.entityManager.query(
        'SELECT * FROM boards WHERE id = $1',
        [id],
      )

      if (queryResult.length === 0) {
        throw new NotFoundException('Board with the provided ID does not exist')
      }

      const boardData = queryResult[0]

      const listsResult = await this.entityManager.query(
        'SELECT * FROM task_lists WHERE "boardId" = $1',
        [id],
      )

      const board: Board = {
        id: boardData.id,
        name: boardData.name,
        lists: listsResult,
      }

      return board
    } catch (error) {
      throw new Error('Failed to fetch board from the database')
    }
  }

  async createBoard(board: Board): Promise<Board> {
    try {
      const { name } = board

      const newBoard = await this.entityManager.query(
        'INSERT INTO boards (name) VALUES ($1)',
        [name],
      )

      return newBoard
    } catch (error) {
      throw new Error('Failed to create board')
    }
  }

  async deleteBoard(id: number): Promise<void> {
    try {


      await this.entityManager.query('DELETE FROM activity_log WHERE board_id = $1', [id])
      await this.entityManager.query('DELETE FROM tasks WHERE board_id = $1', [id])
      await this.entityManager.query('DELETE FROM task_lists WHERE "boardId" = $1', [id])

      await this.entityManager.query('DELETE FROM boards WHERE id = $1', [id])
    } catch (error) {
      throw new Error('Failed to delete board')
    }
  }

  async updateBoard(id: number, board: Board): Promise<Board> {
    try {
      const { name } = board
      const updatedBoard = await this.entityManager.query(
        'UPDATE boards SET name = $1 WHERE id = $2 RETURNING *',
        [name, id],
      )

      if (updatedBoard.length === 0) {
        throw new NotFoundException('Board with the provided ID does not exist')
      }

      return updatedBoard[0]
    } catch (error) {
      throw new Error('Failed to update board')
    }
  }
}
