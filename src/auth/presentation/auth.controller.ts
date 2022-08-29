import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthUseCases } from '../application/auth.usecases';
import {
  AuthenticatedUserDTO,
  RegisterUserDTO,
  SigninUserDTO,
} from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCases) {}

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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: AuthenticatedUserDTO, status: 200 })
  @ApiResponse({ type: BadRequestException, status: 400 })
  @ApiResponse({ type: InternalServerErrorException, status: 500 })
  async validate(): Promise<AuthenticatedUserDTO> {
    return await this.authUseCase.validateFromToken('');
  }
}
