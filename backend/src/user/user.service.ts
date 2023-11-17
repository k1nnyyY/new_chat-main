import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class UserService {
    constructor
    (
    private readonly dbService: DatabaseService,
    ) {};

    async findAllUsers(queryParams) {
      let query = `
      SELECT users.*, statuses.*, (
        SELECT ARRAY_AGG(images.path ORDER BY images.id DESC) 
        FROM public.images 
        WHERE users.id = images.user_id
      ) as avatars
      FROM public.users
      LEFT JOIN public.statuses ON users.id = statuses.user_id
      LEFT JOIN public.images ON users.id = images.user_id
    `;
      const conditions = [];
    
      if (queryParams.id) {
        conditions.push(`users.id = ${queryParams.id}`);
      }
      if (queryParams.firstname) {
        conditions.push(`users.firstname = '${queryParams.firstname}'`);
      }
      if (queryParams.type && queryParams.type !== 'PLACEHOLDER') {
        conditions.push(`users.type = '${queryParams.type}'`);
      }
      if (queryParams.status  && queryParams.status !== 'PLACEHOLDER') {
        conditions.push(`statuses.status = '${queryParams.status}'`);
      }
    
      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }
    
      query += `GROUP BY users.id, statuses.status, statuses.id
      ORDER BY users.id ASC`;      
      try {
        const result = await this.dbService.query(query);
        console.log(result);
        return result;
      } catch (error) {
        console.error(error);
        throw error; // Можно перебросить ошибку, чтобы обработать ее в контроллере
      }     
    }

    async findUserById(id:number) {
        const queryString = 'SELECT * FROM users WHERE id = $1';
        const params = [Number(id)];
        let user = await this.dbService.query(queryString, params);
        const images = await this.dbService.query('SELECT * FROM images WHERE user_id = $1 ORDER BY id ASC', [Number(user[0].id)]);
        const statuses = await this.dbService.query('SELECT * FROM statuses WHERE user_id = $1', [Number(user[0].id)])
        user[0]['avatar'] = images;
        user[0]['statuses'] = statuses[0];
        console.log(user);
        return user;
    }

    async acceptModeration(id: number) {
      console.log("acceptModeration:", id);
      await this.dbService.query('UPDATE statuses SET rejection_reason = $2 WHERE user_id = $1', [id, null]);
      return await this.dbService.query('UPDATE statuses SET base_moderation = true WHERE user_id = $1', [id]);
    }

    async cancelModeration(id: number) {
      console.log('cancelModeration:', id);
      await this.dbService.query('UPDATE statuses SET rejection_reason = $2 WHERE user_id = $1', [id, 'Нет подтверждения национальности']);
      return await this.dbService.query('UPDATE statuses SET base_moderation = false WHERE user_id = $1', [id]);
    }

    async updateUserInfo(id:number, username:string, phone:string, email:string, birthday:string){
      // Разделение имени и фамилии
      const [firstname, lastname] = username.split(' ');

      // Преобразование формата дня рождения
      const [day, month, year] = birthday.split('.');
      const formattedBirthday = `${year}-${month}-${day}`;

      // SQL-запрос для обновления информации
      const pgquery = `
          UPDATE users
          SET 
              firstname = $1,
              lastname = $2,
              phone_number = $3,
              email = $4,
              birthday = $5
          WHERE id = $6
      `;

      const result = await this.dbService.query(pgquery, [firstname, lastname, phone===''?null:phone, email, formattedBirthday, id]);

      return result;    
    }

}
