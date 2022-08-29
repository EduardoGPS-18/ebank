import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { datasource } from './data-source';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    TypeOrmModule.forRootAsync({
      dataSourceFactory: async () => {
        await datasource.initialize();
        return datasource;
      },
      useFactory: () => ({}),
    }),
  ],
})
export class MainModule {}
