export type RegisterAuthParams = {
  cpf: string;
  fullName: string;
  password: string;
  email: string;
};

export type AuthenticatedUser = {
  id: string;
  cpf: string;
  email: string;
  fullName: string;
};

export type Payload = {
  sub: string;
  email: string;
};
