import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Player } from '../model/player.model';

@ApiTags('Player')
@Controller('Player')
export class PlayerController {
  @Post('Add')
  @ApiBody({
    schema: {
      example: {
        name: 'string',
        number: 0,
        position: 'string',
        team: 0,
        birthday: '2021-08-01T16:47:28.495Z',
        height: 0,
        weight: 0,
        avatarUrl: 'string',
      },
    },
  })
  public add(@Body() playerData: Player) {
    const player = Player.create(playerData);
    return player;
  }

  @Put('Update')
  @ApiBody({
    schema: {
      example: {
        id: 1,
        name: 'string',
        number: 0,
        position: 'string',
        team: 0,
        birthday: '2021-08-01T16:47:28.495Z',
        height: 0,
        weight: 0,
        avatarUrl: 'string',
      },
    },
  })
  public async update(@Body() playerData: Player) {
    await Player.update(playerData, { where: { id: playerData.id } });
    const playerUpdate = await Player.findByPk(playerData.id);
    return playerUpdate;
  }

  @Get('Get')
  @ApiQuery({ name: 'playerId' })
  public async get(@Query() params, @Res() response) {
    const player = await Player.findByPk(params.playerId);
    if (player) {
      return player;
    } else {
      response.status(409);
      response.send('Player not exist !');
    }
  }

  @Get('GetPlayers')
  public async getPlayers() {
    const allUsers = await Player.findAll();
    return {
      data: allUsers,
    };
  }

  @Delete('Delete')
  @ApiQuery({ name: 'playerId' })
  public async delete(@Query() params) {
    const deletedData = await Player.destroy({
      where: { id: params.playerId },
    });
    return deletedData;
  }
}
