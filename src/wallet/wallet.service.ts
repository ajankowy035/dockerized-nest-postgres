import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WalletEntity } from './models/wallet.entity';
import { UserEntity } from './../user/models/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity) private repo: Repository<WalletEntity>,
  ) {}

  getOne(user: UserEntity) {
    const wallet = this.repo.findOneBy({ user });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async create(user: UserEntity) {
    const wallet = await this.repo.create({ coins: 0, user });
    return this.repo.save(wallet);
  }

  async donate(id: number, coins: number) {
    const wallet = await this.repo.findOneBy({ id });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const updatedCoins = wallet.coins - coins;
    const updatedWallet = { ...wallet, coins: updatedCoins };

    return this.repo.save(updatedWallet);
  }

  async charge(id: number, coins: number) {
    const wallet = await this.repo.findOneBy({ id });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const updatedCoins = wallet.coins + coins;
    const updatedWallet = { ...wallet, coins: updatedCoins };
    console.log(updatedWallet);
    return this.repo.save(updatedWallet);
  }
}
