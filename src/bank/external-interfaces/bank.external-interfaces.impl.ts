import { BankUseCases } from '../application/bank.usecases';
import { BankExternalInterface } from './bank.external-interfaces';
import { OpenBankAccountDTO } from './bank.external-interfaces.dto';

export class BankExternalInterfaceIMPL implements BankExternalInterface {
  constructor(private bankUseCases: BankUseCases) {}

  async openAccount({ userId, userType }: OpenBankAccountDTO): Promise<void> {
    await this.bankUseCases.openAccount({ id: userId, accountType: userType });
  }
}
