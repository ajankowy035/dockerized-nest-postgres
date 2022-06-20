import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterEntity } from './models/shelter.entity';
import { ShelterController } from './shelter.controller';
import { ShelterService } from './shelter.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShelterEntity])],
  controllers: [ShelterController],
  providers: [ShelterService],
  exports: [ShelterService],
})
export class ShelterModule {}
