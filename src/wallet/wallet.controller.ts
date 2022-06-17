import { WalletEntity } from './models/wallet.entity';
import { Controller, Body, UseGuards, Patch, Get } from '@nestjs/common';
import { UserEntity } from './../user/models/user.entity';
import { AuthGuard } from './../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.intraceptor';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { WalletDto } from './wallet.dto';
import { WalletService } from './wallet.service';
import { WalletDonateDto } from './wallet-donate.dto';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  @UseGuards(AuthGuard)
  @Serialize(WalletDto)
  getOne(@CurrentUser() user: UserEntity) {
    return this.walletService.getOne(user);
  }

  @Get('new')
  @UseGuards(AuthGuard)
  @Serialize(WalletDto)
  createWallet(@CurrentUser() user: UserEntity) {
    return this.walletService.create(user);
  }

  @Patch('donate')
  @UseGuards(AuthGuard)
  @Serialize(WalletDto)
  donate(@Body() body: WalletDonateDto) {
    return this.walletService.donate(body.id, body.coins);
  }

  @Patch('charge')
  @UseGuards(AuthGuard)
  @Serialize(WalletDto)
  charge(@Body() body: WalletDonateDto): Promise<WalletEntity> {
    return this.walletService.charge(body.id, body.coins);
  }
}
