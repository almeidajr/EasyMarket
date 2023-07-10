import { PartialType } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  @MinLength(8)
  readonly passwordConfirm: string;

  @IsString()
  readonly oldPassword: string;
}
