import { ShelterEntity } from './../../shelter/models/shelter.entity';
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
  admin: boolean;

  @Expose()
  @Transform(({ obj }) => obj?.wallet?.id)
  wallet_id: number;

  @Expose()
  @Transform(({ obj }) =>
    obj?.shelters?.map((shelter) => ({
      shelter_id: shelter.id,
    })),
  )
  shelters: { shelter_id: number }[];
}
