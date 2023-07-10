import { IsNumber, IsString } from 'class-validator';

export class CreateShoppingListItemDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly category: string;

  @IsNumber()
  readonly quantity: number;
}
