import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { ShoppingList } from './entities/shopping-list.entity';
import { ShoppingListItemsService } from './shopping-list-items.service';

@Injectable()
export class ShoppingListsService {
  constructor(
    @InjectRepository(ShoppingList)
    private readonly shoppingListsRepository: Repository<ShoppingList>,
    private readonly shoppingListItemsService: ShoppingListItemsService,
  ) {}

  async create(
    userId: string,
    { name, comments, items }: CreateShoppingListDto,
  ): Promise<ShoppingList> {
    const alreadyExists = await this.shoppingListsRepository.findOne({
      userId,
      name,
    });
    if (alreadyExists) {
      throw new ConflictException(
        'A shopping list with the given name already exists for this user',
      );
    }

    const list = this.shoppingListsRepository.create({
      userId,
      name,
      comments,
    });
    await this.shoppingListsRepository.save(list);
    if (items) {
      await this.shoppingListItemsService.createBulk(list.id, items);
    }

    return list;
  }

  async findAll(userId: string): Promise<ShoppingList[]> {
    return await this.shoppingListsRepository.find({ userId });
  }

  async findOne(userId: string, id: string) {
    const list = await this.shoppingListsRepository.findOne(id, {
      relations: ['shoppingListItems'],
    });
    if (!list) {
      throw new NotFoundException('Shopping list not found');
    }
    if (userId !== list.userId) {
      throw new ForbiddenException("You cannot see another user's data");
    }
    return list;
  }

  async update(
    userId: string,
    id: string,
    { action, items, ...rest }: UpdateShoppingListDto,
  ): Promise<ShoppingList> {
    const list = await this.shoppingListsRepository.findOne(id);
    if (!list) {
      throw new NotFoundException('Shopping list not found');
    }

    if (userId !== list.userId) {
      throw new ForbiddenException("You cannot change another user's data");
    }

    this.shoppingListsRepository.merge(list, rest);

    switch (action) {
      case 'append':
        await this.shoppingListItemsService.createBulk(list.id, items);
        break;
      case 'replace':
        await this.shoppingListItemsService.replaceBulk(list.id, items);
        break;
      case 'remove':
        await this.shoppingListItemsService.removeBulk(list.id);
        break;
    }

    return list;
  }

  async remove(userId: string, id: string): Promise<void> {
    const list = await this.shoppingListsRepository.findOne(id);
    if (!list) {
      throw new NotFoundException('Shopping list not found');
    }
    if (userId !== list.userId) {
      throw new ForbiddenException("You cannot delete another user's data");
    }
    await this.shoppingListsRepository.delete(id);
  }
}
