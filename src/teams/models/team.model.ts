import { Column, Model, Table } from 'sequelize-typescript';
import { Blob } from 'buffer';
import Sequelize from 'sequelize';

@Table
export class Team extends Model {
  @Column
  name: string;
  @Column
  foundationYear: number;
  @Column
  division: string;
  @Column
  conference: string;
  @Column(Sequelize.BLOB)
  imageUrl: Blob;
}
