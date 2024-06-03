import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Favorite } from 'src/schemas/favorites.schema'
import { ThrowHttpException } from 'src/utils/config/httpExceptions'
import { enumMessageError } from 'src/utils/enums/message.error'

@Injectable()
export class CoinsService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}

  async list() {
    const response = await fetch(
      `${process.env.API_COINS}/last/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL,ARS-BRL,CHF-BRL,AUD-BRL,CNY-BRL,GBP-BRL,LTC-BRL`,
    )

    const listCoins = Object.values(await response.json())

    return listCoins
  }

  async historic(payload: CoinType.GetHistoric) {
    const response = await fetch(
      `${process.env.API_COINS}/daily/${payload.coin}/${payload.days}`,
    )

    const listCoins: CoinType.Item[] = Object.values(await response.json())

    const listNamesForGraphic = listCoins.map((item: CoinType.Item) => {
      return Number(item.timestamp)
    })

    const listValuesForGraphic = listCoins.map((item: CoinType.Item) => {
      return item.varBid
    })

    return {
      listCoins,
      listNamesForGraphic,
      listValuesForGraphic,
    }
  }

  async favorite(payload: CoinType.FavoritePayload) {
    const favoriteAlreadyExists = await this.favoriteModel
      .findOne({ coin: payload.coin, userId: payload.userId })
      .exec()

    if (favoriteAlreadyExists) {
      ThrowHttpException(enumMessageError.COIN.FAVORITE_ALREADY_EXISTS, 400)
    }

    const favorite = await this.favoriteModel.create({
      userId: payload.userId,
      coin: payload.coin,
    })

    return favorite
  }
}
