import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { HashService } from './hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create({
    name,
    email,
    password,
    passwordConfirm,
  }: CreateUserDto): Promise<User> {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const alreadyExists = await this.usersRepository.findOne({ email });
    if (alreadyExists) {
      throw new ConflictException('E-mail already registered');
    }

    const hash = await this.hashService.generate(password);
    const user = this.usersRepository.create({
      name,
      email,
      password: hash,
    });

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async update(
    id: string,
    { name, email, password, passwordConfirm, oldPassword }: UpdateUserDto,
  ): Promise<User> {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordsMatch = await this.hashService.compare(
      oldPassword,
      user.password,
    );
    if (!passwordsMatch) {
      throw new ForbiddenException('Invalid password');
    }

    const hash = await this.hashService.generate(password);

    this.usersRepository.merge(user, { name, email, password: hash });

    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ email });
  }

  async checkPassword(user: User, password: string): Promise<boolean> {
    return await this.hashService.compare(password, user.password);
  }
}
