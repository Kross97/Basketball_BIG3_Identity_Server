import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Auth extends Model {
  @AllowNull(false)
  @Column
  userName: string;

  @AllowNull(false)
  @Column
  login: string;

  @AllowNull(false)
  @Column({
    validate: {
      isValidPassword(password) {
        if (password.length <= 3 || password.length >= 15) {
          throw Error('Password Validation Error!');
        }
      },
    },
  })
  password: string;

  @Column
  access_token: string;
}
