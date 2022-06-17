import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class WalletDto {
  @Expose()
  id: number;

  @Expose()
  coins: number;

  @Transform(({ obj }) => obj?.user?.id)
  @Expose()
  userId: number;
}
