import { Expose, Transform } from 'class-transformer';
import { WalletEntity } from './../../wallet/models/wallet.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => obj?.wallet?.id)
  wallet: WalletEntity;
}
