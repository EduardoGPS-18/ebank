import { JwtService } from '@nestjs/jwt';
import { SessionServiceI } from 'src/auth/domain/domain-services/auth.services.dependencies';
import { Payload } from 'src/auth/domain/domain-services/auth.services.dto';

export class SessionAdapter implements SessionServiceI {
  constructor(private jwtService: JwtService) {}

  generate(payload: Payload): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): Payload {
    return this.jwtService.verify(token);
  }
}
