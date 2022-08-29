import bcrypt from 'bcrypt';
import { HasherServiceI } from 'src/auth/domain/services/auth.services.dependencies';

export class BcryptAdapter implements HasherServiceI {
  async encrypt(value: string): Promise<string> {
    const salts = await bcrypt.genSalt(12);
    return bcrypt.hash(value, salts);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
