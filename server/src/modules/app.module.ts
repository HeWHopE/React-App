// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './list.module';
import { TaskModule } from './task.module';
import { ActivityLogModule } from './activity-log.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'node_postgres',
      entities: [],
      synchronize: true,
    }),
    ListModule,
    TaskModule,
    ActivityLogModule,
  ],
})
export class AppModule {}
