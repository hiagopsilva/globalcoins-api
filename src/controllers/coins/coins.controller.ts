import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { CoinsService } from './coins.service'
import { AuthGuard } from '../auth/auth.guard'
import { zodValidatorPipe } from 'src/utils/config/zodValidatorPipe'
import { getHistoricValidator } from 'src/pipes/coins/get-historic.pipe'

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async list() {
    return this.coinsService.list()
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(getHistoricValidator))
  @Post('/historic')
  async historic(@Body() getHistoricPayload: CoinType.GetHistoric) {
    return this.coinsService.historic(getHistoricPayload)
  }
}
