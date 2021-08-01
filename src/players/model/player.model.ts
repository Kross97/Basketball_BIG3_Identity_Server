import { Column, Model, Table } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { Blob } from 'buffer';

@Table
export class Player extends Model {
  @Column
  name: string;

  @Column
  number: number;

  @Column
  position: string;

  @Column
  team: number;

  @Column
  birthday: string;

  @Column
  height: number;

  @Column
  weight: number;

  @Column(Sequelize.BLOB)
  avatarUrl: Blob;
}
