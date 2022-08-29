import { BankService } from '../domain/services/bank.service';
import {
  OpenAccountParams,
  TransferParams,
} from '../domain/services/bank.service.dto';
import { OpenedAccountResult, SucceedTransferenceResult } from './bank.dto';

export class BankUseCases {
  constructor(private readonly bankService: BankService) {}

  async openAccount(params: OpenAccountParams): Promise<OpenedAccountResult> {
    return await this.bankService.openAccount(params);
  }
  async transfer(params: TransferParams): Promise<SucceedTransferenceResult> {
    return await this.bankService.transfer(params);
  }
}
