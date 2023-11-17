// database.module.ts

import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // Экспортируем сервис, чтобы он был доступен в других модулях
})
export class DatabaseModule {}
