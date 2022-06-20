import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShelterEntity } from './models/shelter.entity';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(ShelterEntity) private repo: Repository<ShelterEntity>,
  ) {}

  async getAll() {
    return this.repo.find({
      relations: {
        donators: true,
      },
    });
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async createShelter(name: string) {
    const shelter = this.repo.create({ name });

    return await this.repo.save(shelter);
  }

  async donate(id: number, coins) {
    const query = this.repo.createQueryBuilder();
    const shelter = await this.findOne(id);

    const updatedShelter = {
      ...shelter,
      budget: shelter.budget + coins,
    };

    return this.repo.save(updatedShelter);
  }
}
