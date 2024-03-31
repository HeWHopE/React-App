import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './list.module';
import { TaskModule } from './task.module';
import { ActivityLogModule } from './activity-log.module';
import * as dotenv from 'dotenv'; 


dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      synchronize: true,
    }),
    ListModule,
    TaskModule,
    ActivityLogModule,
  ],
})
export class AppModule {}
