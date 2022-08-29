import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthExternalInterface } from 'src/auth/external-interfaces/auth.external-interfaces';

export class JwtGuard implements CanActivate {
  constructor(private authServices: AuthExternalInterface) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;
    const userId = await this.authServices?.validateToken({ token });
    request.body.user = { id: userId };
    return true;
  }
}
