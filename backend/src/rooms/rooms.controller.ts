import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly eventsService: RoomsService) {}
    
    @Get()
    async findRooms() {
      const findedRooms = await this.eventsService.findAllRooms();
      return findedRooms;
    };

    // @Get('/:id')
    // async findUserById(@Param() params){
    //   return await this.eventsService.findUserById(params.id);
    // };
}
