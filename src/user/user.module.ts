import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ShelterModule } from './../shelter/shelter.module';
import { AuthService } from './auth.service';
import { UserEntity } from './models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CurrentUserMiddleaware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ShelterModule],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleaware).forRoutes('*');
  }
}
