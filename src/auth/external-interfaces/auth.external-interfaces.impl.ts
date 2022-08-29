import { AuthUseCases } from '../application/auth.usecases';
import { AuthExternalInterface } from './auth.external-interfaces';

export class AuthExternalInterfaceIMPL implements AuthExternalInterface {
  constructor(private authUsecases: AuthUseCases) {}

  async validateToken({ token }: { token: string }): Promise<string> {
    try {
      return (await this.authUsecases.validateFromToken(token)).id;
    } catch (err) {
      throw new Error(err);
    }
  }
}
