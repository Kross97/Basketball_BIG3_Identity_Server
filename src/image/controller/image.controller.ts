import {
  Controller,
  Delete,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile, unlink, readFile, open } from 'fs/promises';
import { ImageModel } from '../models/image.model';
import { Blob } from 'buffer';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('Image')
@Controller('Image')
export class ImageController {
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  @Post('imageToBlob')
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        id: 1,
        src: '[Blob source]',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  public async imageToBlob(@UploadedFile() file: Express.Multer.File) {
    const encodeImage = new Blob([file.buffer], { type: file.mimetype });
    const image = await ImageModel.create({ src: encodeImage });
    return { id: image.id, src: image.src };
  }

  @ApiQuery({ name: 'idFile' })
  @Delete('deleteBlobImage')
  public async deleteBlobImage(@Query() params) {
    await ImageModel.destroy({ where: { id: params.idFile } });
    return 'image blob delete success';
  }

  @ApiResponse({ status: 201, description: 'file saved in server directory' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  @Post('saveImage')
  @UseInterceptors(FileInterceptor('file'))
  public async saveImage(@UploadedFile() file: Express.Multer.File) {
    await writeFile(`./savedImages/${file.originalname}`, file.buffer);
    return 'image saved success';
  }

  @ApiQuery({ name: 'fileName' })
  @Delete('deleteImage')
  public async deleteImage(@Query() params) {
    await unlink(`./savedImages/${params.fileName}`);
  }
}
