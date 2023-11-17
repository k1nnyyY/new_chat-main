import { Injectable } from '@nestjs/common';
import { Pool, Client } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;
  
  constructor() {
    this.pool = new Pool({
      user: 'korpu',
      host: 'korpustage.ru',
      database: 'korpu',
      password: 'kaakf9290alfdaalfkklalaf8',
      port: 5433, // или другой порт, если он отличается
      // user: 'postgres',
      // host: 'localhost',
      // database: 'postgres',
      // password: 'nothing',
      // port: 5432, // или другой порт, если он отличается
    });
  }

  async query(queryString: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query(queryString, params);
      return rows;
    } finally {
      client.release();
    }
  }
}
