export type RegisterAuthParams = {
  cpf: string;
  fullName: string;
  password: string;
  email: string;
};

export type LoginAuthParams = {
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  id: string;
  cpf: string;
  email: string;
  session: string;
  fullName: string;
};

export type Payload = {
  sub: string;
  email: string;
};
