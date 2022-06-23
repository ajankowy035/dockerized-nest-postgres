import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dtos/create-shelter.dto';
import { Serialize } from '../interceptors/serialize.intraceptor';
import { ShelterDto } from './dtos/shelter.dto';

@Controller('shelter')
export class ShelterController {
  constructor(private shelterService: ShelterService) {}

  @Get()
  @Serialize(ShelterDto)
  getAll() {
    return this.shelterService.getAll();
  }

  @Get('/:id')
  @Serialize(ShelterDto)
  getOne(@Param('id') id: string) {
    return this.shelterService.findOne(parseInt(id));
  }

  @Post('new')
  createShelter(@Body() body: CreateShelterDto) {
    return this.shelterService.createShelter(body.name);
  }
}
