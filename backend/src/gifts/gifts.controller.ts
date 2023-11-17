import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { GiftsService } from './gifts.service';

@Controller('gifts')
export class GiftsController {
    constructor(private readonly giftsService: GiftsService) {}

    @Get('/gifts')
    async getGifts() {
        return await this.giftsService.getGifts();
    }

    @Get('/flowers')
    async getFlowers() {
        return await this.giftsService.getFlowers();
    }

}
