import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IGame } from "../interface";

@Entity()
export class Game implements IGame {
  @PrimaryGeneratedColumn()
  gid: string;

  @Column()
  name: string;

  @Column()
  saleYear: string;

  @Column({ default: 0 })
  favorCount?: number;

  @Column()
  price: string;

  @Column({ default: 0.0 })
  rate?: number;

  @Column({ default: false })
  release: boolean;
}
