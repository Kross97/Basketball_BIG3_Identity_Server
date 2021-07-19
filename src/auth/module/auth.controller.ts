import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth';
import { Auth } from '../models/auth';

@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUp(@Body() signupData): Promise<Auth> {
    return this.authService.signUp(signupData);
  }

  @Get()
  ping(): string {
    return 'pong';
  }
}
