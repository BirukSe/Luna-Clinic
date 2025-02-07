import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';  // Importing express types

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  register(@Body() user){
    return this.authService.register(user);
  }
  @Post('/login')
  login(@Body() user){
    return this.authService.login(user);
  }
  @Post('/isthere')
  isthere(@Body() user){
    return this.authService.isthere(user);
  }
}