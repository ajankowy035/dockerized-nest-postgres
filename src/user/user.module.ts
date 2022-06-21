import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Injectable } from '@nestjs/common';
import { ShelterModule } from './../shelter/shelter.module';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { AuthService } from './auth.service';
import { UserEntity } from './models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ShelterModule],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  exports: [UserService],
})
export class UserModule {}
