import { IsNumber } from 'class-validator';

export class WalletChargeDto {
  @IsNumber()
  coins: number;
}
