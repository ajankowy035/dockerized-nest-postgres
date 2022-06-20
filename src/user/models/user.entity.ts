import { ShelterEntity } from './../../shelter/models/shelter.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WalletEntity } from './../../wallet/models/wallet.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user)
  wallet: WalletEntity;

  @ManyToMany(() => ShelterEntity, (shelter) => shelter.donators, {
    cascade: true,
  })
  @JoinTable()
  public shelters!: ShelterEntity[];
}