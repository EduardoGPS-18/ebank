import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthUseCase } from './application/auth.usecases';
import { AuthServices } from './domain/domain-services/auth.services';
import { BcryptAdapter } from './infra/adapters/bcrypt.adapter';
import { SessionAdapter } from './infra/adapters/session.adapter';
import { UserModel } from './infra/typeorm/models/user.model';
import { TypeormUserRepository } from './infra/typeorm/repositories/typeorm.user-repository';
import { AuthController } from './presentation/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [JwtModule, TypeOrmModule.forFeature([UserModel])],
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
      provide: AuthUseCase,
      inject: [AuthServices],
      useFactory: (authService: AuthServices) => {
        return new AuthUseCase(authService);
      },
    },
  ],
})
export class AuthModule {}
