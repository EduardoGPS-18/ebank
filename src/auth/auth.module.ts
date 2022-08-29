import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { BankModule } from 'src/bank/bank.module';
import { BankExternalInterface } from 'src/bank/external-interfaces/bank.external-interfaces';
import { DataSource } from 'typeorm';
import { AuthUseCases } from './application/auth.usecases';
import { AuthServices } from './domain/services/auth.services';
import { AuthExternalInterface } from './external-interfaces/auth.external-interfaces';
import { AuthExternalInterfaceIMPL } from './external-interfaces/auth.external-interfaces.impl';
import { BcryptAdapter } from './infra/adapters/bcrypt.adapter';
import { SessionAdapter } from './infra/adapters/session.adapter';
import { UserModel } from './infra/typeorm/models/user.model';
import { TypeormUserRepository } from './infra/typeorm/repositories/typeorm.user-repository';
import { AuthController } from './presentation/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    TypeOrmModule.forFeature([UserModel]),
    forwardRef(() => BankModule),
  ],
  exports: [AuthExternalInterface],
  providers: [
    {
      provide: BcryptAdapter,
      useClass: BcryptAdapter,
    },
    {
      provide: SessionAdapter,
      inject: [JwtService],
      useFactory: (jwtService: JwtService) => new SessionAdapter(jwtService),
    },
    {
      provide: TypeormUserRepository,
      inject: [getDataSourceToken()],
      useFactory: async (datasource: DataSource) => {
        const userRepository = datasource.getRepository(UserModel);
        return new TypeormUserRepository(userRepository);
      },
    },
    {
      provide: AuthServices,
      inject: [TypeormUserRepository, BcryptAdapter, SessionAdapter],
      useFactory: (
        userRepository: TypeormUserRepository,
        hasherService: BcryptAdapter,
        sessionService: SessionAdapter,
      ) => {
        return new AuthServices(userRepository, hasherService, sessionService);
      },
    },
    {
      provide: AuthUseCases,
      inject: [AuthServices, BankExternalInterface],
      useFactory: (
        authService: AuthServices,
        bankServices: BankExternalInterface,
      ) => {
        return new AuthUseCases(authService, bankServices);
      },
    },
    {
      provide: AuthExternalInterface,
      inject: [AuthUseCases],
      useFactory: (authUseCase: AuthUseCases) => {
        return new AuthExternalInterfaceIMPL(authUseCase);
      },
    },
  ],
})
export class AuthModule {}
