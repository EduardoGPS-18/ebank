import { AmountTooLow } from '../errors/customer.error';
import { UserBase } from './user-base.entity';

export class Customer extends UserBase {
  withdraw(amountToDepositInCents: number): void {
    if (this._balanceInCents - amountToDepositInCents < 0) {
      throw new AmountTooLow();
    }
    this._balanceInCents -= amountToDepositInCents;
  }
}
