import { IsNumber } from 'class-validator';

export class WalletDonateDto {
  @IsNumber()
  shelterId: number;

  @IsNumber()
  coins: number;
}
