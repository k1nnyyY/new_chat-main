import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventController } from './events.controller';
import { DatabaseModule } from '../database.module';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [DatabaseModule],
  providers: [EventsService, UserService],
  controllers: [EventController],
  exports: [EventsService]
})
export class EventsModule {}
