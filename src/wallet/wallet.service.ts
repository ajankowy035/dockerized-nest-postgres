import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    if (user.wallet) {
      throw new BadRequestException('User has a wallet already');
    }
    const wallet = await this.repo.create({ coins: 0, user });
    return this.repo.save(wallet);
  }

  async donate(shelterId: number, coins: number, user: UserEntity) {
    const wallet = await this.repo.findOneBy({ id: user.wallet.id });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (!coins) {
      throw new BadRequestException('Donating with amount of 0');
    }

    if (wallet.coins - coins < 0) {
      throw new BadRequestException('Not enough money in wallet');
    }

    await this.shelterService.donate(shelterId, coins, user);

    const updatedCoins = wallet.coins - coins;
    const updatedWallet = { ...wallet, coins: updatedCoins };

    return this.repo.save(updatedWallet);
  }

  async charge(coins: number, id: number) {
    const wallet = await this.repo.findOneBy({ id });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (!coins) {
      throw new BadRequestException('Charging with amount of 0');
    }

    const updatedCoins = Number(wallet.coins) + coins;
    const updatedWallet = { ...wallet, coins: updatedCoins };
    return this.repo.save(updatedWallet);
  }
}
