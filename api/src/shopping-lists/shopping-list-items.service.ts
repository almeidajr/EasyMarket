import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { ShoppingListItem } from './entities/shopping-list-item.entity';

@Injectable()
export class ShoppingListItemsService {
  constructor(
    @InjectRepository(ShoppingListItem)
    private readonly shoppingListItemRepository: Repository<ShoppingListItem>,
  ) {}

  async createBulk(
    shoppingListId: string,
    createShoppingListItemsDto: CreateShoppingListItemDto[],
  ): Promise<ShoppingListItem[]> {
    const items = createShoppingListItemsDto.map((item) =>
      this.shoppingListItemRepository.create({ shoppingListId, ...item }),
    );
    return await this.shoppingListItemRepository.save(items);
  }

  async removeBulk(shoppingListId: string): Promise<void> {
    await this.shoppingListItemRepository.delete({
      shoppingListId,
    });
  }

  async replaceBulk(
    shoppingListId: string,
    createShoppingListItemsDto: CreateShoppingListItemDto[],
  ): Promise<ShoppingListItem[]> {
    await this.removeBulk(shoppingListId);
    return await this.createBulk(shoppingListId, createShoppingListItemsDto);
  }
}
