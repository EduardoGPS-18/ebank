import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthUseCases } from '../application/auth.usecases';

export class JwtAuthGuard implements CanActivate {
  constructor(private authUseCase: AuthUseCases) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization.split(' ')[1];
    try {
      await this.authUseCase.validateFromToken(token);
      return true;
    } catch (err) {
      throw new ForbiddenException('Expired Session');
    }
  }
}
