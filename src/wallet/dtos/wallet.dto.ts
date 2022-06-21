import { Expose, Transform } from 'class-transformer';

export class WalletDto {
  @Expose()
  id: number;

  @Expose()
  coins: number;

  @Expose()
  @Transform(({ obj }) => obj?.user?.id)
  userId: number;
}
