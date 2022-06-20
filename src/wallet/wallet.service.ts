import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShelterService } from './../shelter/shelter.service';
import { WalletEntity } from './models/wallet.entity';
import { UserEntity } from './../user/models/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity) private repo: Repository<WalletEntity>,
    private shelterService: ShelterService,
  ) {}

  async getOne(user: UserEntity) {
    const wallet = await this.repo.findOne({
      where: { user },
      relations: {
        user: true,
      },
    });
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async create(user: UserEntity) {
    const wallet = await this.repo.create({ coins: 0, user });
    return this.repo.save(wallet);
  }

  async donate(shelterId: number, id: number, coins: number, user: UserEntity) {
    const wallet = await this.repo.findOneBy({ id });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    await this.shelterService.donate(shelterId, coins);

    const updatedCoins = wallet.coins - coins;
    const updatedWallet = { ...wallet, coins: updatedCoins };

    return this.repo.save(updatedWallet);
  }

  async charge(id: number, coins: number) {
    const wallet = await this.repo.findOneBy({ id });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const updatedCoins = Number(wallet.coins) + coins;
    const updatedWallet = { ...wallet, coins: updatedCoins };
    return this.repo.save(updatedWallet);
  }
}
