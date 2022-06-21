import { Transform } from 'class-transformer';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity()
export class ShelterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  budget: number;

  @ManyToMany(() => UserEntity, (user) => user.shelters)
  @Transform(({ obj }) => obj?.user?.id)
  public donators: UserEntity[];
}
