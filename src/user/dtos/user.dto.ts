import { WalletEntity } from './../../wallet/models/wallet.entity';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  wallet: WalletEntity;
}
