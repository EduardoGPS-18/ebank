import { RepositoryInterface } from 'src/@shared/domain/repository/repository.interface';
import { User } from '../entities/user.entity';

export abstract class UserRepository extends RepositoryInterface<User> {
  abstract findByEmail({ email }: { email: string }): Promise<User>;
  abstract update(entity: User): Promise<void>;
}
