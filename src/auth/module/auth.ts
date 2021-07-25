import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from '../models/auth';
import { AuthService } from '../service/auth';

@Module({
  imports: [SequelizeModule.forFeature([Auth])],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [SequelizeModule],
})
export class AuthModule {}
