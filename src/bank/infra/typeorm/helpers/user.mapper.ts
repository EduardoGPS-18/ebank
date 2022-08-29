import { Customer } from 'src/bank/domain/entities/customer.entity';
import { Shopkeeper } from 'src/bank/domain/entities/shopkeeper.entity';
import { UserBase } from 'src/bank/domain/entities/user-base.entity';
import { AccountTypeModel, UserModel } from '../models/user.model';

export class UserMapper {
  static toModel(user: UserBase): UserModel {
    const userModel = new UserModel();
    userModel.id = user.id;
    userModel.balanceInCents = user.balanceInCents;
    const isShopkeeper = user instanceof Shopkeeper;
    userModel.accountType = isShopkeeper
      ? AccountTypeModel.shopkeeper
      : AccountTypeModel.customer;
    return userModel;
  }

  static toEntity(user: UserModel): UserBase {
    if (user.accountType === AccountTypeModel.shopkeeper) {
      return new Shopkeeper(user.id, user.balanceInCents);
    } else {
      return new Customer(user.id, user.balanceInCents);
    }
  }

  static toCustomer(user: UserModel): Customer {
    return new Customer(user.id, user.balanceInCents);
  }
}
