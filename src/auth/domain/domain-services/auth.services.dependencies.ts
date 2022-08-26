import { Payload } from './auth.services.dto';

export abstract class HasherServiceI {
  abstract encrypt(value: string): Promise<string>;
  abstract compare(value: string, hash: string): Promise<boolean>;
}

export abstract class SessionServiceI {
  abstract generate(payload: Payload): string;
  abstract verify(token: string): Payload;
}
