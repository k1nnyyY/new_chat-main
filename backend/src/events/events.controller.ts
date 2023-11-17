import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventController {
    constructor(private readonly eventsService: EventsService) {}
    
    @Get()
    async findEvents(@Query() queryParams) {
      const findedEvents = await this.eventsService.findAllEvents(queryParams);
      return findedEvents;
    };

    @Post('/comments/:eventId')
    async createComment(
      @Param('eventId') eventId: number,
      @Body('text') text: string,
    ) {
      return this.eventsService.createComment(+eventId, text);
    }

    @Get('/creators')
    async getCreators(){
      return await this.eventsService.getCreators();
    }

    @Get('/comments/:id')
    async findCommentsById(@Param() params){
      return await this.eventsService.findCommentsById(Number(params.id));
    }


    @Get('/:id')
    async findEventById(@Param() params){
      return await this.eventsService.findEventById(params.id);
    };

}
