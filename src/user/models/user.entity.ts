import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => WalletEntity, (wallet) => wallet.user, {
    onUpdate: 'RESTRICT',
  })
  @JoinColumn()
  wallet: WalletEntity;
}
