import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Blob } from 'buffer';
import Sequelize from 'sequelize';
import { Player } from '../../players/model/player.model';

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
  @HasMany(() => Player)
  players: Player[];
}
