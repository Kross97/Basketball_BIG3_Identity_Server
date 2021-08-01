import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './auth/models/auth';
import { AuthModule } from './auth/module/auth';
import { EchoModule } from './echo/module/echo.module';
import { ImageModule } from './image/module/image.module';
import { ImageModel } from './image/models/image.model';
import { PlayerModule } from './players/module/player.module';
import { Player } from './players/model/player.model';
import { TeamModule } from './teams/module/team.module';
import { Team } from './teams/models/team.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'MYSQL',
      database: 'identity_big3',
      autoLoadModels: true,
      synchronize: true,
      models: [Auth, ImageModel, Player, Team],
    }),
    AuthModule,
    EchoModule,
    ImageModule,
    PlayerModule,
    TeamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
