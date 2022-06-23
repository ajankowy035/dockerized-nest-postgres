import { ShelterEntity } from './../../shelter/models/shelter.entity';
import { Expose, Transform } from 'class-transformer';

export class ShelterDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  budget: number;

  @Expose()
  @Transform(({ obj }) =>
    obj?.donators?.map((donator) => ({
      user_id: donator.id,
    })),
  )
  donators: ShelterEntity[];
}
