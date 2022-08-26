import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthServices } from '../domain/domain-services/auth.services';
import {
  LoginAuthParams,
  RegisterAuthParams,
} from '../domain/domain-services/auth.services.dto';
import { InvalidCredentials } from '../domain/error/invalid-credentials';
import { AuthenticatedUserResult } from './auth.dto';

export class AuthUseCase {
  constructor(private authService: AuthServices) {}

  async registerUser(
    params: RegisterAuthParams,
  ): Promise<AuthenticatedUserResult> {
    try {
      const user = await this.authService.registerUser(params);
      await this.authService.updateSession({ email: user.email });
      return user;
    } catch (err) {
      if (err instanceof InvalidCredentials) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Occurred error on server');
    }
  }

  async loginUser(params: LoginAuthParams): Promise<AuthenticatedUserResult> {
    try {
      const user = await this.authService.loginUser(params);
      await this.authService.updateSession({ email: user.email });
      return user;
    } catch (err) {
      if (err instanceof InvalidCredentials) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Occurred error on server');
    }
  }

  async validateFromToken(token: string): Promise<AuthenticatedUserResult> {
    try {
      return this.authService.validateFromToken(token);
    } catch (err) {
      if (err instanceof InvalidCredentials) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Occurred error on server');
    }
  }
}
