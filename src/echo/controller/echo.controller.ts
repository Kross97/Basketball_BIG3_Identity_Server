import { Controller, Delete, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize-typescript';

@ApiTags('Echo')
@Controller('Echo')
export class Echo {
  constructor(private sequelize: Sequelize) {}
  @Get('ping')
  public ping() {
    return 'pong';
  }

  @Delete('deleteAuths')
  deleleteTableAuths() {
    this.sequelize.query('drop table auths;');
  }

  @Delete('deleteImages')
  deleleteTableImages() {
    this.sequelize.query('drop table imagemodels;');
  }
}
