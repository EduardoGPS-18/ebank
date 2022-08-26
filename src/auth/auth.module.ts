import { Module } from '@nestjs/common';
import { AuthUseCase } from './application/auth.usecases';
import { AuthServices } from './domain/domain-services/auth.services';
import { AuthController } from './presentation/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AuthServices,
      useClass: AuthServices,
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
