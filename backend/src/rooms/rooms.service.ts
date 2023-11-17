import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class RoomsService {
    constructor
    (
    private readonly dbService: DatabaseService,
    ) {};

    async findAllRooms() {
      const query = 'SELECT * FROM public.chat_rooms ORDER BY id ASC ';
      try {
        const rooms = await this.dbService.query(query);
        return rooms;
      } catch (error) {
        console.error(error);
        throw error; // Можно перебросить ошибку, чтобы обработать ее в контроллере
      }     
    }

    // async findUserById(id:number) {
    //     const queryString = 'SELECT * FROM users WHERE id = $1';
    //     const params = [Number(id)];
    //     let user = await this.dbService.query(queryString, params);
    //     const images = await this.dbService.query('SELECT * FROM images WHERE user_id = $1', [Number(user[0].id)]);
    //     const statuses = await this.dbService.query('SELECT * FROM statuses WHERE user_id = $1', [Number(user[0].id)])
    //     user[0]['avatar'] = images;
    //     user[0]['statuses'] = statuses[0];
    //     console.log(user);
    //     return user;
    // }

}
