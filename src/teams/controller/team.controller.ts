import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Team } from '../models/team.model';

@ApiTags('Team')
@Controller('Team')
export class TeamController {
  @Post('Add')
  @ApiBody({
    schema: {
      example: {
        name: 'string',
        foundationYear: 0,
        division: 'string',
        conference: 'string',
        imageUrl: 'string',
      },
    },
  })
  public async add(@Body() teamData: Team) {
    const team = Team.create(teamData);
    return team;
  }

  @Put('Update')
  @ApiBody({
    schema: {
      example: {
        id: 1,
        name: 'string',
        foundationYear: 0,
        division: 'string',
        conference: 'string',
        imageUrl: 'string',
      },
    },
  })
  public async update(@Body() teamData: Team) {
    await Team.update(teamData, { where: { id: teamData.id } });
    return await Team.findByPk(teamData.id);
  }

  @Get('Get')
  @ApiQuery({ name: 'teamId' })
  public async get(@Query() params) {
    const team = Team.findByPk(params.teamId);
    return team;
  }

  @Get('GetTeams')
  public async getTeams() {
    return await Team.findAll();
  }

  @Delete('Delete')
  @ApiQuery({ name: 'teamId' })
  public async deleteTeam(@Query() params) {
    await Team.destroy({ where: { id: params.teamId } });
    return params.teamId;
  }
}
