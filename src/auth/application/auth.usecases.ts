import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BankExternalInterface } from 'src/bank/external-interfaces/bank.external-interfaces';
import { InvalidCredentials } from '../domain/error/invalid-credentials';
import { AuthServices } from '../domain/services/auth.services';
import { LoginAuthParams } from '../domain/services/auth.services.dto';
import { AuthenticatedUserResult, SignupUser } from './auth.dto';

export class AuthUseCases {
  constructor(
    private authService: AuthServices,
    private bankServices: BankExternalInterface,
  ) {}

  async registerUser(params: SignupUser): Promise<AuthenticatedUserResult> {
    try {
      const user = await this.authService.registerUser(params);
      const withNewSessionUser = await this.authService.updateSession({
        email: user.email,
      });
      await this.bankServices.openAccount({ userId: user.id });
      return withNewSessionUser;
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
      const withNewSessionUser = await this.authService.updateSession({
        email: user.email,
      });
      return withNewSessionUser;
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
