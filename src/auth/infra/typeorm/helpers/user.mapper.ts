import { User } from 'src/auth/domain/entities/user.entity';
import { UserModel } from '../models/user.model';

export class UserMapper {
  static from(from: User): UserModel {
    const userModel = new UserModel();
    userModel.id = from.id;
    userModel.fullName = from.fullName;
    userModel.email = from.email;
    userModel.cpf = from.cpf;
    userModel.password = from.password;
    userModel.session = from.session;
    return userModel;
  }

  static to(from: UserModel): User {
    return new User({
      id: from.id,
      fullName: from.fullName,
      email: from.email,
      cpf: from.cpf,
      password: from.password,
      session: from.session,
    });
  }
}
