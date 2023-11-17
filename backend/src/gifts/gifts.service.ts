import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class GiftsService {
    constructor
    (
    private readonly dbService: DatabaseService,
    ) {};
    
    async getGifts() {
        return await this.dbService.query('SELECT * FROM gifts WHERE type = $1', ['GIFT'])
    }

    async getFlowers() {
        return await this.dbService.query('SELECT * FROM gifts WHERE type = $1', ['FLOWER'])
    }

}
