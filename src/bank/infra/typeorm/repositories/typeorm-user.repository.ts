import { Customer } from 'src/bank/domain/entities/customer.entity';
import { UserBase } from 'src/bank/domain/entities/user-base.entity';
import { UserRepository } from 'src/bank/domain/repository/user.repository';
import { EntityManager, Repository } from 'typeorm';
import { UserMapper } from '../helpers/user.mapper';
import { AccountTypeModel, UserModel } from '../models/user.model';

export class TypeOrmUserRepository implements UserRepository {
  constructor(private typeormRepository: Repository<UserModel>) {}

  async findUserById({ id }: { id: string }): Promise<UserBase> {
    const userModel = await this.typeormRepository.findOneBy({ id });
    return UserMapper.toEntity(userModel);
  }

  async findCustomerById({ id }: { id: string }): Promise<Customer> {
    const userModel = await this.typeormRepository.findOneBy({
      id,
      accountType: AccountTypeModel.customer,
    });
    return UserMapper.toCustomer(userModel);
  }

  async secureSaveUsers(users: UserBase[]): Promise<void> {
    await this.typeormRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        for (const user of users) {
          await entityManager.save(UserMapper.toModel(user));
        }
      },
    );
  }

  async create(entity: UserBase): Promise<void> {
    await this.typeormRepository.save(UserMapper.toModel(entity));
  }
}
