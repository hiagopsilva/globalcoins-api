import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { CoinsService } from './coins.service'
import { AuthGuard } from '../auth/auth.guard'
import { zodValidatorPipe } from 'src/utils/config/zodValidatorPipe'
import { getHistoricValidator } from 'src/pipes/coins/get-historic.pipe'
import { FavoriteValidator } from 'src/pipes/coins/favorite.pipe'

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async list(@Req() request: ApiType.Request) {
    return this.coinsService.list(request.user.sub)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(getHistoricValidator))
  @Post('/historic')
  async historic(@Body() getHistoricPayload: CoinType.GetHistoric) {
    return this.coinsService.historic(getHistoricPayload)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(FavoriteValidator))
  @Post('/favorite')
  async favorite(@Body() favoritePayload: CoinType.FavoritePayload) {
    return this.coinsService.favorite(favoritePayload)
  }
}
