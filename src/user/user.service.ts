import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async createUser(
    email: string,
    name: string,
    password: string,
    admin?: boolean,
  ): Promise<UserEntity> {
    const user = this.repo.create({ name, email, password, admin });

    return await this.repo.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.repo.find({
      relations: {
        wallet: true,
        shelters: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.repo.find({
      where: { email },
      relations: {
        wallet: true,
        shelters: true,
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['wallet', 'shelters'],
    });

    return user;
  }

  async update(id: number, attrs: Partial<UserEntity>) {
    try {
      const curr = await this.findOne(id);
      if (!curr) {
        throw new NotFoundException('User not found');
      }
      const updatedUser = { ...curr, ...attrs };

      return this.repo.save(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);

      this.repo.remove(user);
    } catch (error) {
      throw error;
    }
  }
}
