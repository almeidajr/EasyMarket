import { Test, TestingModule } from '@nestjs/testing';

import { NfcesService } from './nfces.service';

describe('NfcesService', () => {
  let service: NfcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NfcesService],
    }).compile();

    service = module.get<NfcesService>(NfcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
