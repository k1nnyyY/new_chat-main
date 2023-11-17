import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';

  import { Point } from 'geojson';
  export type UserRoleType = "REGULAR";

  @Entity({ name: 'users' }) // Укажите имя таблицы, если оно отличается
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text', nullable: true })
    phone_number: string;
  
    @Column({ type: 'text', nullable: true })
    email: string;
  
    @Column({ type: 'text', nullable: true })
    apple_id: string;
  
    // @Column({
    //   type: "enum",
    //   enum: ["REGULAR"],
    //   default: "REGULAR"
    // })
    // type: UserRoleType;

    // @Column({ type: 'text', nullable: true })
    // firstname: string;
  
    // @Column({ type: 'text', nullable: true })
    // lastname: string;
  
    // @Column({ type: 'date', nullable: true })
    // birthday: Date;
  
    // @Column({ type: 'text', nullable: true })
    // about_me: string;
  
    // @Column({ type: 'smallint', nullable: true })
    // height: number;
  
    // @Column({ type: 'smallint', nullable: true })
    // weight: number;
  
    // @Column({ type: 'text', nullable: true })
    // alcohol: string;
  
    // @Column({ type: 'text', nullable: true })
    // children: string;
  
    // @Column({ type: 'text', nullable: true })
    // education: string;
  
    // @Column({ type: 'text', nullable: true })
    // eyes: string;
  
    // @Column({ type: 'text', nullable: true })
    // gender: string;
  
    // @Column({ type: 'text', nullable: true })
    // hairs: string;
  
    // @Column('text', { array: true, nullable: true })
    // interests: string[];
  
    // @Column('text', { array: true, nullable: true })
    // languages: string[];
  
    // @Column({ type: 'text', nullable: true })
    // marital_status: string;
  
    // @Column({ type: 'text', nullable: true })
    // physique: string;
  
    // @Column({ type: 'text', nullable: true })
    // religion: string;
  
    // @Column({ type: 'text', nullable: true })
    // smoking: string;
  
    // @Column({ type: 'text', nullable: true })
    // dating_purpose: string;
  
    // @Column({ type: 'text', nullable: true })
    // living: string;
  
    // @Column({ type: 'integer', nullable: true })
    // income_from: number;
  
    // @Column({ type: 'varchar', length: 140, nullable: true })
    // greeting: string;
  
    // @Column('text', { array: true, nullable: true })
    // movies: string[];
  
    // @Column('text', { array: true, nullable: true })
    // serials: string[];
  
    // @Column({ type: 'text', nullable: true })
    // position: string;
  
    // @Column({ type: 'text', nullable: true })
    // specialization: string;
  
    // @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
    // geo_location: Point;

    // @Column({ type: 'text', nullable: true })
    // push_token: string;

    // @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    // last_time_dialog_online: Date;

    // @Column({ type: 'text', nullable: true })
    // city: string;

    // @Column({ type: 'text', nullable: true })
    // country: string;

    // @Column({ type: 'boolean' })
    // base: boolean;

    // @Column({ type: 'boolean' })
    // details: boolean;
      
    // @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    // created_at: Date;
  }