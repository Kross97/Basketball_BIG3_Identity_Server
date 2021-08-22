import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { Blob } from 'buffer';
import { Team } from '../../teams/models/team.model';

@Table
export class Player extends Model {
  @Column
  name: string;

  @Column
  number: number;

  @Column
  position: string;

  @ForeignKey(() => Team)
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
