import { User } from 'src/auth/domain/entities/user.entity';
import { UserRepository } from 'src/auth/domain/repository/user.repository';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';

export class TypeormUserRepository implements UserRepository {
  constructor(private repository: Repository<UserModel>) {}

  update(user: User): Promise<void> {
    return;
  }

  create(entity: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByEmail({ email }: { email: string }): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
