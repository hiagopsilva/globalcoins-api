import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { CoinsService } from './coins.service'
import { AuthGuard } from '../auth/auth.guard'

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async list() {
    return this.coinsService.list()
  }
}
