import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EventsService {
    constructor
    ( private readonly dbService: DatabaseService, private readonly userSevice: UserService ) {};

    async getCreators() {
      const query = `
        SELECT DISTINCT CONCAT(u.firstname, ' ', u.lastname) as organizer
        FROM events e
        JOIN users u ON e.creator_id = u.id
      `;
    
      try {
        const result = await this.dbService.query(query);
        return result;
      } catch (error) {
        throw new Error(`Error fetching organizers: ${error.message}`);
      }
    }

    async createComment(eventId: number, text: string) {
      try {
        const result = await this.dbService.query(
          'INSERT INTO event_comments (event_id, user_id, comment, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
          [eventId, 1, text],
        );
        return result;
      } catch (error) {
        throw new Error(`Unable to create comment: ${error}`);
      }
    }

    async findUserByFirstnameAndLastname(firstname: string, lastname: string) {
      const query = `SELECT * FROM users WHERE firstname = $1 AND lastname = $2`;
      try {
        const user = await this.dbService.query(query, [firstname, lastname]);
        return user[0]; // Предполагаем, что firstname и lastname уникальны
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    
    async findAllEvents(queryParams) {
      try {
        let query = `SELECT * FROM public.events`;
        const conditions = [];
      
        if (queryParams.id) {
          conditions.push(`id = ${queryParams.id}`);
        }
        if (queryParams.name) {
          conditions.push(`name = '${queryParams.name}'`);
        }
        if (queryParams.city && queryParams.city !== 'PLACEHOLDER') {
          conditions.push(`city = '${queryParams.city}'`);
        }
        if (queryParams.status  && queryParams.status !== 'PLACEHOLDER') {
          conditions.push(`status = '${queryParams.status}'`);
        }
        if (queryParams.creator  && queryParams.creator !== 'PLACEHOLDER') {
          const userData = queryParams.creator.split(' ')
          const lastname = userData[1]
          const firstname = userData[0]
          const user = await this.findUserByFirstnameAndLastname(firstname, lastname);
          if (!user) {
            throw new Error(`User with firstname ${firstname} and lastname ${lastname} not found`);
          }      
          conditions.push(`creator_id = '${user.id}'`);
        }
      
        if (conditions.length > 0) {
          query += ` WHERE ${conditions.join(' AND ')}`;
        }
      
        query += ` ORDER BY id ASC`;      

        console.log(query);
        const events = await this.dbService.query(query);
        for (let index = 0; index < events.length; index++) {
          const creator = await this.dbService.query('SELECT * FROM users WHERE id = $1', [Number(events[index].creator_id)])
          events[index]['creator'] = creator[0];
        }
        console.log(events);
        return events;
      } catch (error) {
        console.error(error);
        throw error; // Можно перебросить ошибку, чтобы обработать ее в контроллере
      }     
    }


    async findEventById(id:number) {
      console.log(id)
      const queryString = 'SELECT * FROM events WHERE id = $1';
      const params = [Number(id)];
      try {
        let event = await this.dbService.query(queryString, params);
        const images = await this.dbService.query('SELECT * FROM images WHERE event_id = $1', [Number(event[0].id)]);
        event[0]['avatar'] = images;
        const creator = await this.dbService.query('SELECT * FROM users WHERE id = $1', [Number(event[0].creator_id)])
        event[0]['creator'] = creator[0];
        const likes = await this.dbService.query('SELECT * FROM event_likes WHERE event_id = $1',[Number(event[0].id)]);
        event[0]['likes'] = likes;
        const participants = await this.dbService.query('SELECT * FROM event_participants WHERE event_id = $1', [Number(event[0].id)]);
        const users = [];
        for (let index = 0; index < participants.length; index++) {
          const element = participants[index];
          const user = await this.userSevice.findUserById(element.user_id);
          users.push(user[0]);
        }
        event[0]['users']=users;
        console.log(event);
        return event;
  
      } catch (e) {
        console.log(e)
      }
  }

  async findCommentsById(id:number){
    const queryString = 'SELECT * FROM event_comments WHERE event_id = $1';
    try {
      const comments = await this.dbService.query(queryString, [id]);
      for (let index = 0; index < comments.length; index++) {
        const owner = await this.userSevice.findUserById(Number(comments[index].user_id));
        comments[index]['owner'] = owner[0];
      }
      console.log(comments);
      return comments;
    } catch (error) {
      console.error(error);
      throw error; // Можно перебросить ошибку, чтобы обработать ее в контроллере
    }     

  }

}
