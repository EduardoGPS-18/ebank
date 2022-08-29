export enum AccountType {
  shopkeeper,
  customer,
}
export type OpenAccountParams = {
  id: string;
  accountType: AccountType;
};
export type OpenedAccount = {
  accountId: string;
};

export type UserId = string;
export type TransferParams = {
  from: UserId;
  to: UserId;
  amount: number;
};
export type TransferenceResult = {
  newBalance: number;
};
