import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Team } from '../models/team.model';
import { TeamController } from '../controller/team.controller';

@Module({
  imports: [SequelizeModule.forFeature([Team])],
  controllers: [TeamController],
  exports: [SequelizeModule],
})
export class TeamModule {}
