import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BuyerPresence } from './entities/buyer-presence.entity';
import { Consumer } from './entities/consumer.entity';
import { FinalCostumer } from './entities/final-costumer.entity';
import { Issuer } from './entities/issuer.entity';
import { Nfce } from './entities/nfce.entity';
import { OperationDestination } from './entities/operation-destination.entity';
import { PaymentMethod } from './entities/payment-method.entity';
import { Purchase } from './entities/purchase.entity';
import { NfcesController } from './nfces.controller';
import { NfcesService } from './nfces.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuyerPresence,
      Consumer,
      FinalCostumer,
      Issuer,
      Nfce,
      OperationDestination,
      PaymentMethod,
      Purchase,
    ]),
  ],
  controllers: [NfcesController],
  providers: [NfcesService],
})
export class NfcesModule {}
