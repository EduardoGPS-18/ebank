export enum AccountType {
  shopkeeper,
  customer,
}

export type OpenBankAccountDTO = {
  userId: string;
  userType: AccountType;
};
