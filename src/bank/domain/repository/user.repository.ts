import { RepositoryInterface } from '../../../@shared/domain/repository/repository.interface';
import { Customer } from '../entities/customer.entity';
import { UserBase } from '../entities/user-base.entity';

export abstract class UserRepository extends RepositoryInterface<UserBase> {
  abstract findUserById({ id }: { id: string }): Promise<UserBase>;
  abstract findCustomerById({ id }: { id: string }): Promise<Customer>;
  abstract secureSaveUsers(users: UserBase[]): Promise<void>;
}
