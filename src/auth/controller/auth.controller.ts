import { Controller, Get, Post, Body, Delete, Res } from '@nestjs/common';
import { AuthService } from '../service/auth';
import { Auth } from '../models/auth';
import { Sequelize } from 'sequelize-typescript';
import { Response } from 'express';

@Controller('Auth')
export class AuthController {
  constructor(
    private sequelize: Sequelize,
    private readonly authService: AuthService,
  ) {}

  @Post('signUp')
  async signUp(
    @Body() signupData,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Auth | any> {
    try {
      return await this.authService.signUp(signupData);
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        response.status(502);
        return { type: err.errors[0].type, message: err.errors[0].message };
      } else {
        response.status(500);
      }
    }
  }

  @Post('signIn')
  async signIn(
    @Body() signInData,
    @Res({ passthrough: true }) response,
  ): Promise<Auth | any> {
    try {
      return await this.authService.singIn(signInData);
    } catch (err) {
      if (err.invalidSingIn) {
        response.status(400);
        return { type: 'No defined', message: 'user or password wrong!' };
      }
    }
  }

  @Get('getAllAuth')
  async getAllAuths(): Promise<Auth[]> {
    return this.authService.getAllAuth();
  }

  @Delete()
  deleleteTable() {
    this.sequelize.query('drop table auths;');
  }

  @Get()
  ping(): string {
    return 'pong';
  }
}
