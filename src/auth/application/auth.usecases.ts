import { AuthServices } from '../domain/domain-services/auth.services';

export class AuthUseCase {
  constructor(private authService: AuthServices) {}
}
