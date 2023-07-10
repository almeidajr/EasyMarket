import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Nfce } from './entities/nfce.entity';

@Injectable()
export class NfcesService {
  constructor(
    @InjectRepository(Nfce)
    private readonly nfcesRepository: Repository<Nfce>,
  ) {}

  async findAll(userId: string): Promise<Nfce[]> {
    return await this.nfcesRepository.find({
      where: { userId },
      relations: ['issuer'],
    });
  }

  async findOne(userId: string, id: string): Promise<Nfce> {
    const nfce = await this.nfcesRepository.findOne(id, {
      relations: [
        'issuer',
        'operationDestination',
        'finalCostumer',
        'buyerPresence',
        'paymentMethod',
        'purchases',
      ],
    });
    if (!nfce) {
      throw new NotFoundException(`Nfce with ID "${id}" not found`);
    }
    if (userId !== nfce.userId) {
      throw new ForbiddenException("You cannot see another user's data");
    }
    return nfce;
  }

  async remove(userId: string, id: string): Promise<void> {
    const nfce = await this.nfcesRepository.findOne(id);
    if (!nfce) {
      throw new NotFoundException(`Nfce with ID "${id}" not found`);
    }
    if (userId !== nfce.userId) {
      throw new ForbiddenException("You cannot delete another user's data");
    }
    await this.nfcesRepository.remove(nfce);
  }
}
