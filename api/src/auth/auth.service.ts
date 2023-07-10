import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isValid = await this.usersService.checkPassword(user, password);
    if (!isValid) {
      return null;
    }

    return user;
  }

  async login({ id, email }: User): Promise<LoginResponseDto> {
    const payload = { email, sub: id };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
