import { NotFoundError } from '../../../@shared/domain/errors/not-found.error';
import { Customer } from '../entities/customer.entity';
import { Shopkeeper } from '../entities/shopkeeper.entity';
import { UserRepository } from '../repository/user.repository';
import { ValidateTransferenceGateway } from './bank.service.dependencies';
import {
  AccountType,
  OpenAccountParams,
  OpenedAccount,
  TransferenceResult,
  TransferParams,
} from './bank.service.dto';

export class BankService {
  constructor(
    private userRepository: UserRepository,
    private readonly validateTransferGateway: ValidateTransferenceGateway,
  ) {}

  async openAccount(params: OpenAccountParams): Promise<OpenedAccount> {
    const { id, accountType } = params;
    const isShopkeeper = accountType === AccountType.shopkeeper;
    const user = isShopkeeper ? new Shopkeeper(id) : new Customer(id);
    await this.userRepository.create(user);
    const accountId = user.id;
    return { accountId };
  }

  async transfer(transferParams: TransferParams): Promise<TransferenceResult> {
    const { from, to, amount } = transferParams;
    const fromUser = await this.userRepository.findCustomerById({ id: from });
    if (!fromUser) {
      throw new NotFoundError('Sender user not found');
    }
    const toUser = await this.userRepository.findUserById({ id: to });
    if (!toUser) {
      throw new NotFoundError('Receiver user not found');
    }
    fromUser.withdraw(amount);
    toUser.deposit(amount);
    await this.userRepository.secureSaveUsers([fromUser, toUser]);
    await this.validateTransferGateway.validate({ amount, from, to });
    return { newBalance: fromUser.balanceInReais };
  }
}
