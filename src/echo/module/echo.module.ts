import { Module } from '@nestjs/common';
import { Echo } from '../controller/echo.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature()],
  exports: [SequelizeModule],
  controllers: [Echo],
})
export class EchoModule {}
