import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  name: string;

  @Column({ default: "Frontend Engineer" })
  description?: string;

  @Column()
  age: number;

  @Column({ default: "Frontend Engineer" })
  job?: string;

  @Column({ default: false })
  isMarried?: boolean;
}
