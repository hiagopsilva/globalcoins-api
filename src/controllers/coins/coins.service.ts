import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Favorite } from 'src/schemas/favorites.schema'
import { enumMessageSuccess } from 'src/utils/enums/message.success'

@Injectable()
export class CoinsService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}

  async list(userId: number) {
    const response = await fetch(
      `${process.env.API_COINS}/last/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL,ARS-BRL,CHF-BRL,AUD-BRL,CNY-BRL,GBP-BRL,LTC-BRL`,
    )

    const responseFavorites = await this.favoriteModel.find({ userId }).exec()

    const listCoins: CoinType.Item[] = Object.values(await response.json())

    return listCoins.map((item) => {
      return {
        ...item,
        isFavorite: responseFavorites.some(
          (favorite) => favorite.coin === `${item.code}-${item.codein}`,
        ),
      }
    })
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
      const favorite = await this.favoriteModel.findOne({
        userId: payload.userId,
        coin: payload.coin,
      })

      await this.favoriteModel.findByIdAndDelete(favorite._id)
    } else {
      await this.favoriteModel.create({
        userId: payload.userId,
        coin: payload.coin,
      })
    }

    return { message: enumMessageSuccess.COIN.FAVORITE }
  }
}
