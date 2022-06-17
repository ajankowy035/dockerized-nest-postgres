import { IsNumber } from 'class-validator';

export class WalletDonateDto {
  @IsNumber()
  id: number;

  @IsNumber()
  coins: number;
}
