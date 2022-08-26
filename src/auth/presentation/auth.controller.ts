import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthUseCase } from '../application/auth.usecases';
import {
  AuthenticatedUserDTO,
  RegisterUserDTO,
  SigninUserDTO,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  @Post('signup')
  @ApiResponse({ type: AuthenticatedUserDTO, status: 200 })
  @ApiResponse({ type: BadRequestException, status: 400 })
  @ApiResponse({ type: InternalServerErrorException, status: 500 })
  async signup(@Body() params: RegisterUserDTO): Promise<AuthenticatedUserDTO> {
    return await this.authUseCase.registerUser(params);
  }

  @Post('signin')
  @ApiResponse({ type: AuthenticatedUserDTO, status: 200 })
  @ApiResponse({ type: BadRequestException, status: 400 })
  @ApiResponse({ type: InternalServerErrorException, status: 500 })
  async signin(@Body() params: SigninUserDTO): Promise<AuthenticatedUserDTO> {
    return await this.authUseCase.loginUser(params);
  }

  @Get('self')
  @ApiResponse({ type: AuthenticatedUserDTO, status: 200 })
  @ApiResponse({ type: BadRequestException, status: 400 })
  @ApiResponse({ type: InternalServerErrorException, status: 500 })
  async validate(): Promise<AuthenticatedUserDTO> {
    return await this.authUseCase.validateFromToken('');
  }
}
