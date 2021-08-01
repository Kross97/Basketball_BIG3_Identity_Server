import { Column, Model, Table } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { Blob } from 'buffer';

@Table
export class ImageModel extends Model {
  @Column(Sequelize.BLOB)
  src: Blob;
}
