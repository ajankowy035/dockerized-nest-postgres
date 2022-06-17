import { Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity()
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(0)
  coins: number;

  @OneToOne(() => UserEntity, (user) => user.wallet, {
    onUpdate: 'RESTRICT',
  })
  @JoinColumn()
  user: UserEntity;
}
