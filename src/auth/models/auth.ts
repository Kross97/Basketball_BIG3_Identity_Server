import { AllowNull, Column, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Auth extends Model {
  @AllowNull(false)
  @ApiProperty()
  @Column
  userName: string;

  @AllowNull(false)
  @ApiProperty()
  @Column
  login: string;

  @AllowNull(false)
  @ApiProperty()
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

  @ApiProperty()
  @Column
  access_token: string;
}
