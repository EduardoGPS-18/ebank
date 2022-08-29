import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { UserType } from '../application/auth.dto';

class BaseRegisterUserDTO {
  @ApiProperty({ example: '12345678901', type: 'string' })
  cpf: string;

  @ApiProperty({ example: 'any@email.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  fullName: string;
}

export class AuthenticatedUserDTO extends BaseRegisterUserDTO {
  @ApiProperty({ example: randomUUID() })
  id: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lI.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  session: string;
}

export class RegisterUserDTO extends BaseRegisterUserDTO {
  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ enum: UserType, default: UserType.customer })
  userType: UserType;
}

export class SigninUserDTO {
  @ApiProperty({ example: 'any@email.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;
}
