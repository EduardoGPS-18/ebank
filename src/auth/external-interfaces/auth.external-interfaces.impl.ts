import { AuthUseCases } from '../application/auth.usecases';
import { AuthExternalInterface } from './auth.external-interfaces';

export class AuthExternalInterfaceIMPL implements AuthExternalInterface {
  constructor(private authService: AuthUseCases) {}

  async validateToken({ token }: { token: string }): Promise<boolean> {
    try {
      await this.authService.validateFromToken(token);
      return true;
    } catch (err) {
      return false;
    }
  }
}
