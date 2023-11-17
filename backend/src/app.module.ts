import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database.module';
import { EventsModule } from './events/events.module';
import { RoomsModule } from './rooms/rooms.module';
import { FilesModule } from './files/files.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { GiftsModule } from './gifts/gifts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    EventsModule,
    DatabaseModule,
    RoomsModule,
    FilesModule,
    SubscriptionsModule,
    GiftsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
