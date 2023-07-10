import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BuyerPresence } from './buyer-presence.entity';
import { FinalCostumer } from './final-costumer.entity';
import { Issuer } from './issuer.entity';
import { OperationDestination } from './operation-destination.entity';
import { PaymentMethod } from './payment-method.entity';
import { Purchase } from './purchase.entity';

@Entity('nfces')
export class Nfce {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column({ nullable: true })
  consumerId?: string;

  @Column()
  issuerId: string;

  @Column()
  operationDestinationId: string;

  @Column()
  finalCostumerId: string;

  @Column()
  buyerPresenceId: string;

  @Column()
  paymentMethodId: string;

  @Column()
  sourceUrl: string;

  @Column()
  accessKey: string;

  @Column()
  additionalInformation: string;

  @Column('integer')
  model: number;

  @Column('integer')
  series: number;

  @Column('integer')
  number: number;

  @Column('timestamp')
  emissionDate: Date;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  icmsBasis: number;

  @Column('decimal')
  icmsValue: number;

  @Column('bigint')
  protocol: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Issuer)
  issuer: Issuer;

  @ManyToOne(() => OperationDestination)
  operationDestination: OperationDestination;

  @ManyToOne(() => FinalCostumer)
  finalCostumer: FinalCostumer;

  @ManyToOne(() => BuyerPresence)
  buyerPresence: BuyerPresence;

  @ManyToOne(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @OneToMany(() => Purchase, (purchase) => purchase.nfce)
  purchases: Purchase[];
}
