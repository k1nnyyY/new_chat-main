import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class SubscriptionsService {
    constructor(
        private readonly dbService: DatabaseService,
    ) {}

    async getAllSubs () {
        const query = 'SELECT * FROM subscriptions ORDER BY id ASC';
        try {
            return await this.dbService.query(query);
        } catch (error) {
            console.error(error);
        }
    }
}
