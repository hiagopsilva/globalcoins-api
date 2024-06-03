import { Injectable } from '@nestjs/common'

@Injectable()
export class CoinsService {
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
}
