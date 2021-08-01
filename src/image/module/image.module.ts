import { Module } from '@nestjs/common';
import { ImageController } from '../controller/image.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageModel } from '../models/image.model';

@Module({
  imports: [SequelizeModule.forFeature([ImageModel])],
  controllers: [ImageController],
  exports: [SequelizeModule],
})
export class ImageModule {}
