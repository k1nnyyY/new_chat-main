import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    async findUsers(@Query() queryParams) {
      const findedUser = await this.userService.findAllUsers(queryParams);
      return findedUser;
    };

    @Get('/:id')
    async findUserById(@Param() params){
      return await this.userService.findUserById(params.id);
    };

    @Put('/:id')
    async updateUserById(@Body() body, @Param() params){
      return await this.userService.updateUserInfo(Number(params.id), body.username,body.phone,body.email,body.birthday);
    }

    @Post('/cancel/:id')
    async cancelModeration(@Param() params) {
      return await this.userService.cancelModeration(+params.id);
    }

    @Post('/accept/:id')
    async acceptModeration(@Param() params) {
      return await this.userService.acceptModeration(+params.id);
    }

}
