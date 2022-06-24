import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ShelterEntity } from './shelter/models/shelter.entity';
import { WalletEntity } from './wallet/models/wallet.entity';
import { UserEntity } from './user/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { ShelterModule } from './shelter/shelter.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        if (configService.get<string>('NODE_ENV') === 'test') {
          return {
            type: 'sqlite',
            database: 'test.sqlite',
            autoLoadEntities: true,
            synchronize: true,
            entities: [UserEntity, ShelterEntity, WalletEntity],
          };
        }
        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          autoLoadEntities: true,
          synchronize: true,
          entities: [UserEntity, ShelterEntity, WalletEntity],
        };
      },
    }),
    UserModule,
    WalletModule,
    ShelterModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['cookiekeysdas'],
        }),
      )
      .forRoutes('*');
  }
}
