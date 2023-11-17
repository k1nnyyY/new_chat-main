import { Controller, Get } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
@Controller('subscriptions')
export class SubscriptionsController {
    constructor(
        private readonly subscribtionsService: SubscriptionsService,
    ) {}
    
    @Get()
    async getAllSubs() {
        return this.subscribtionsService.getAllSubs();
    }
}
