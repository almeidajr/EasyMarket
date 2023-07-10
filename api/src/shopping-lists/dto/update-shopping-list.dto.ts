import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { CreateShoppingListDto } from './create-shopping-list.dto';

type Action = 'append' | 'remove' | 'replace';

export class UpdateShoppingListDto extends PartialType(CreateShoppingListDto) {
  @IsString()
  readonly action: Action;
}
