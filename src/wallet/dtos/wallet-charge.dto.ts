import { IsNumber } from 'class-validator';

export class WalletChargeDto {
  @IsNumber()
  id: number;

  @IsNumber()
  coins: number;
}
