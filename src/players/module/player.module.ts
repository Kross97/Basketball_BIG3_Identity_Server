import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Player } from '../model/player.model';
import { PlayerController } from '../controller/player.controller';

@Module({
  imports: [SequelizeModule.forFeature([Player])],
  controllers: [PlayerController],
  exports: [SequelizeModule],
})
export class PlayerModule {}
