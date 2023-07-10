import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/types/authenticated-request.type';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { ShoppingListsService } from './shopping-lists.service';

@ApiTags('shopping-lists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(private readonly shoppingListsService: ShoppingListsService) {}

  @Post()
  async create(
    @Req() { user }: AuthenticatedRequest,
    @Body() createShoppingListDto: CreateShoppingListDto,
  ) {
    return await this.shoppingListsService.create(
      user.id,
      createShoppingListDto,
    );
  }

  @Get()
  async findAll(@Req() { user }: AuthenticatedRequest) {
    return await this.shoppingListsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(
    @Req() { user }: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return await this.shoppingListsService.findOne(user.id, id);
  }

  @Patch(':id')
  async update(
    @Req() { user }: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateShoppingListDto: UpdateShoppingListDto,
  ) {
    return await this.shoppingListsService.update(
      user.id,
      id,
      updateShoppingListDto,
    );
  }

  @Delete(':id')
  async remove(@Req() { user }: AuthenticatedRequest, @Param('id') id: string) {
    return await this.shoppingListsService.remove(user.id, id);
  }
}
