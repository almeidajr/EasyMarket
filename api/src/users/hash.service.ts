import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  async generate(payload: string) {
    const hashSalt = this.configService.get<number>('HASH_SALT');
    return await hash(payload, hashSalt);
  }

  async compare(payload: string, hashed: string) {
    return await compare(payload, hashed);
  }
}
