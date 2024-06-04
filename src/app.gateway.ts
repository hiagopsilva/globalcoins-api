import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Injectable, Logger } from '@nestjs/common'
import { Server } from 'socket.io'

import { Cron } from '@nestjs/schedule'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Coin } from './schemas/coin.schema'

@Injectable()
@WebSocketGateway()
export class AppGateway {
  @WebSocketServer() server: Server

  constructor(@InjectModel(Coin.name) private coinModel: Model<Coin>) {}

  private readonly logger = new Logger(AppGateway.name)

  @Cron('*/2 * * * *')
  async handleCron() {
    this.logger.debug('Calling external endpoint...')
    const coinsList = await fetch(
      `${process.env.API_COINS}/last/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL,ARS-BRL,CHF-BRL,AUD-BRL,CNY-BRL,GBP-BRL,LTC-BRL`,
    )
    const coinCacheData = await this.coinModel.find().exec()

    const jsonCoinList = await coinsList.json()

    if (coinCacheData.length === 0) {
      this.logger.debug('No data found in cache. Saving data to cache...')
      await this.coinModel.create({ data: JSON.stringify(jsonCoinList) })

      return
    }

    if (coinCacheData[0].data !== JSON.stringify(jsonCoinList)) {
      this.logger.debug('Data has changed. Updating cache...')
      this.server.emit('UPDATE_LIST_COINS')
      await this.coinModel.deleteMany({})
    }
  }
}
