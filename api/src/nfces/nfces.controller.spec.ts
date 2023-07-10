import { Test, TestingModule } from '@nestjs/testing';

import { NfcesController } from './nfces.controller';
import { NfcesService } from './nfces.service';

describe('NfcesController', () => {
  let controller: NfcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NfcesController],
      providers: [NfcesService],
    }).compile();

    controller = module.get<NfcesController>(NfcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
