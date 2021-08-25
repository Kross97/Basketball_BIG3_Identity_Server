import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '../service/auth';
import { Auth } from '../models/auth';
import { Response } from 'express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      title: 'Title',
      type: 'object',
      example: {
        userName: 'Test',
        login: 'test_login',
        password: '1111',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'Login_Exist.',
    schema: {
      example: {
        type: 'Login_Exist',
        message: 'Login for sign up exists!',
      },
    },
  })
  @Post('SignUp')
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
      } else if (err.type === 'Login_Exist') {
        response.status(409);
        return { type: err.type, message: err.message };
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
}
