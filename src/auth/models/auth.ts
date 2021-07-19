import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Auth extends Model {
  @Column
  userName: string;

  @Column
  login: string;
}
