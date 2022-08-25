import { randomUUID } from 'crypto';
export type UserConstructor = {
  fullName: string;
  password: string;
  email: string;
  cpf: string;
  id?: string;
};

export class User {
  protected _fullName: string;
  protected _password: string;
  protected _session: string;
  protected _email: string;
  protected _cpf: string;
  protected _id?: string;

  constructor({ fullName, password, email, cpf, id }: UserConstructor) {
    this._fullName = fullName;
    this._password = password;
    this._email = email;
    this._cpf = cpf;
    this._id = id ?? randomUUID();
  }

  updateSession({ session }: { session: string }): void {
    this._session = session;
  }

  get id(): string {
    return this._id;
  }

  get password(): string {
    return this.password;
  }

  toJson() {
    return {
      id: this._id,
      fullName: this._fullName,
      email: this._email,
      cpf: this._cpf,
      password: this._password,
      session: this._session,
    };
  }
}
