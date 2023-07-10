import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';

export class CreateShoppingListDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly comments?: string;

  @IsOptional()
  @ValidateNested()
  readonly items?: CreateShoppingListItemDto[];
}
