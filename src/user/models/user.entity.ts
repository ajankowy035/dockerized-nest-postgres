import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShelterEntity } from './../../shelter/models/shelter.entity';
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

  @Column({ default: true })
  admin: boolean;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user, { eager: true })
  wallet: WalletEntity;

  @ManyToMany(() => ShelterEntity, (shelter) => shelter.donators, {
    cascade: true,
  })
  @JoinTable()
  shelters: ShelterEntity[];
}
