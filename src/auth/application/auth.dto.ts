export type AuthenticatedUserResult = {
  id: string;
  cpf: string;
  email: string;
  session: string;
  fullName: string;
};

export enum UserType {
  customer = 'customer',
  shopkeeper = 'shopkeeper',
}

export type SignupUser = {
  userType: UserType;
  cpf: string;
  fullName: string;
  password: string;
  email: string;
};
