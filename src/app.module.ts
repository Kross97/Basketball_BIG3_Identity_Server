import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './auth/models/auth';
import { AuthModule } from './auth/module/auth';

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
      models: [Auth],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
