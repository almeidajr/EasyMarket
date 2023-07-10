import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Nfce } from './nfce.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nfceId: string;

  @Column('bigint')
  code: number;

  @Column()
  description: string;

  @Column('decimal')
  quantity: number;

  @Column()
  unit: string;

  @Column('decimal')
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Nfce, (nfce) => nfce.purchases)
  nfce: Nfce;
}
