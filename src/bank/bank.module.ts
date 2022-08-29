import { HttpModule, HttpService } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDataSourceToken } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DataSource } from 'typeorm';
import { BankUseCases } from './application/bank.usecases';
import { UserRepository } from './domain/repository/user.repository';
import { BankService } from './domain/services/bank.service';
import { BankExternalInterface } from './external-interfaces/bank.external-interfaces';
import { BankExternalInterfaceIMPL } from './external-interfaces/bank.external-interfaces.impl';
import { ValidateTransferenceMock } from './infra/gateways/validate-transference.gateway';
import { UserModel } from './infra/typeorm/models/user.model';
import { TypeOrmUserRepository } from './infra/typeorm/repositories/typeorm-user.repository';
import { BankController } from './presentation/bank.controller';

@Module({
  controllers: [BankController],
  exports: [BankExternalInterface],
  imports: [HttpModule, ConfigModule, forwardRef(() => AuthModule)],
  providers: [
    {
      provide: TypeOrmUserRepository,
      inject: [getDataSourceToken()],
      useFactory: (dataSource: DataSource): UserRepository => {
        const userRepository = dataSource.getRepository(UserModel);
        return new TypeOrmUserRepository(userRepository);
      },
    },
    {
      provide: ValidateTransferenceMock,
      inject: [HttpService, ConfigService],
      useFactory: (httpService: HttpService, configService: ConfigService) => {
        return new ValidateTransferenceMock(httpService, configService);
      },
    },
    {
      provide: BankService,
      inject: [TypeOrmUserRepository, ValidateTransferenceMock],
      useFactory: (
        userRepository: TypeOrmUserRepository,
        validateTransfer: ValidateTransferenceMock,
      ) => {
        return new BankService(userRepository, validateTransfer);
      },
    },
    {
      provide: BankUseCases,
      inject: [BankService],
      useFactory: (bankService: BankService) => {
        return new BankUseCases(bankService);
      },
    },
    {
      provide: BankExternalInterface,
      inject: [BankUseCases],
      useFactory: (bankUsecases: BankUseCases): BankExternalInterface => {
        return new BankExternalInterfaceIMPL(bankUsecases);
      },
    },
  ],
})
export class BankModule {}
