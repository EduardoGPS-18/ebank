export abstract class UserBase {
  private _id: string;
  protected _balanceInCents: number;

  constructor(id: string, balanceInCents?: number) {
    this._id = id;
    this._balanceInCents = balanceInCents ?? 0;
  }

  deposit(amountInCents: number): void {
    this._balanceInCents += amountInCents;
  }

  get id(): string {
    return this._id;
  }

  get balanceInReais(): number {
    return this._balanceInCents / 100;
  }

  get balanceInCents(): number {
    return this._balanceInCents;
  }

  toJson() {
    return {
      id: this.id,
      balanceInCents: this.balanceInCents,
    };
  }
}
