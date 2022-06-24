import { BadRequestException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../user/models/user.entity';
import { ShelterEntity } from './models/shelter.entity';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(ShelterEntity) private repo: Repository<ShelterEntity>,
  ) {}

  async getAll() {
    return this.repo.find({ relations: ['donators'] });
  }

  async findOne(id: number) {
    const shelter = this.repo.findOne({
      where: { id },
      relations: { donators: true },
    });

    if (!shelter) {
      throw new NotFoundException('Shelter not found');
    }

    return shelter;
  }

  async findWithName(name: string) {
    const shelter = this.repo.findOne({
      where: { name },
    });

    if (!shelter) {
      throw new NotFoundException('Shelter not found');
    }

    return shelter;
  }

  async createShelter(name: string) {
    const shelter = await this.findWithName(name);

    if (shelter) {
      throw new BadRequestException('Shelter with this name already exists');
    }

    const newShelter = this.repo.create({ name });
    return await this.repo.save(newShelter);
  }

  async donate(id: number, coins, user: UserEntity) {
    const shelter = await this.findOne(id);

    const donators = shelter.donators.includes(user)
      ? shelter.donators
      : [...shelter.donators, user];

    const updatedShelter = {
      ...shelter,
      budget: shelter.budget + coins,
      donators,
    };

    return this.repo.save(updatedShelter);
  }
}
