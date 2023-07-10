import { IsUrl } from 'class-validator';

export class CreateNfceDto {
  @IsUrl()
  url: string;
}
