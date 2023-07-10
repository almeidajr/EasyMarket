import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/types/authenticated-request.type';
import { CreateNfceDto } from './dto/create-nfce.dto';
import { NfcesService } from './nfces.service';

@ApiTags('nfces')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('nfces')
export class NfcesController {
  constructor(
    private readonly configService: ConfigService,
    private readonly nfcesService: NfcesService,
  ) {}

  @Post()
  @Redirect()
  async create(@Body() createNfceDto: CreateNfceDto) {
    return {
      url: this.configService.get<string>('SCRAPER_URL'),
      statusCode: 308,
      data: createNfceDto,
    };
  }

  @Get()
  async findAll(@Req() { user }: AuthenticatedRequest) {
    return await this.nfcesService.findAll(user.id);
  }

  @Get(':id')
  async findOne(
    @Req() { user }: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return await this.nfcesService.findOne(user.id, id);
  }

  @Delete(':id')
  async remove(@Req() { user }: AuthenticatedRequest, @Param('id') id: string) {
    return await this.nfcesService.remove(user.id, id);
  }
}
