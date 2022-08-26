import { User } from '../entities/user.entity';
import { InvalidCredentials } from '../error/invalid-credentials';
import { UserRepository } from '../repository/user.repository';
import { HasherServiceI, SessionServiceI } from './auth.services.dependencies';
import {
  AuthenticatedUser,
  LoginAuthParams,
  RegisterAuthParams,
} from './auth.services.dto';

export class AuthServices {
  constructor(
    private userRepository: UserRepository,
    private hasher: HasherServiceI,
    private session: SessionServiceI,
  ) {}

  async registerUser(params: RegisterAuthParams): Promise<AuthenticatedUser> {
    const { password: rawPassword } = params;
    const password = await this.hasher.encrypt(rawPassword);
    const user = new User({ ...params, password: password });
    try {
      await this.userRepository.create(user);
    } catch (err) {
      if (err.code == 23505) {
        throw new InvalidCredentials('User already exists');
      }
    }

    return user.toJson();
  }

  async loginUser(params: LoginAuthParams): Promise<AuthenticatedUser> {
    const { email, password: rawPassword } = params;
    const errorText = 'Invalid email or password';

    const user = await this.userRepository.findByEmail({ email });
    if (!user) throw new InvalidCredentials(errorText);

    const passwordMatch = await this.hasher.compare(rawPassword, user.password);
    if (!passwordMatch) throw new InvalidCredentials(errorText);

    return user.toJson();
  }

  async updateSession({ email }: { email: string }): Promise<void> {
    const user = await this.userRepository.findByEmail({ email });
    const session = this.session.generate({
      email: user.email,
      sub: user.id,
    });
    user.updateSession({ session });
    await this.userRepository.update(user);
  }

  async validateFromToken(token: string): Promise<AuthenticatedUser> {
    const { email } = await this.session.verify(token);

    const user = await this.userRepository.findByEmail({ email });
    if (!user) throw new InvalidCredentials('Invalid email or password');

    return user.toJson();
  }
}
