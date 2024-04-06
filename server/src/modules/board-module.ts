// list/list.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardController } from 'src/controllers/board.controllet'
import { Board } from 'src/entities/Board.entity'
import { BoardService } from 'src/services/board.service'
import { ActivityLogService } from 'src/services/activity-log.service'

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService, ActivityLogService],
})
export class BoardModule {}
