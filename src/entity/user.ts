import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interface';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  name: string;

  @Column({ default: 'Frontend Engineer' })
  description?: string;

  @Column()
  age: number;

  @Column({ default: 'Frontend Engineer' })
  job?: string;

  @Column({ default: false })
  isMarried?: boolean;
}
