import { User } from 'src/auth/domain/entities/user.entity';
import { UserRepository } from 'src/auth/domain/repository/user.repository';
import { Repository } from 'typeorm';
import { UserMapper } from '../helpers/user.mapper';
import { UserModel } from '../models/user.model';

export class TypeormUserRepository implements UserRepository {
  constructor(private repository: Repository<UserModel>) {}

  async update(user: User): Promise<void> {
    await this.repository.save(UserMapper.from(user));
  }

  async create(user: User): Promise<void> {
    await this.repository.save(UserMapper.from(user));
  }

  async findByEmail({ email }: { email: string }): Promise<User> {
    const userModel = await this.repository.findOneBy({ email });
    try {
      return UserMapper.to(userModel);
    } catch (err) {
      console.log(userModel);
    }
  }
}
