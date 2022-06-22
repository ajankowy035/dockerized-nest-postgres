import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../user/models/user.entity';
import { UserService } from '../user/user.service';
import { ShelterEntity } from './models/shelter.entity';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(ShelterEntity) private repo: Repository<ShelterEntity>,
    private userService: UserService,
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

  async createShelter(name: string) {
    const shelter = this.repo.create({ name });

    return await this.repo.save(shelter);
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
