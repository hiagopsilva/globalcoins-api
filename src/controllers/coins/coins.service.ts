import { Injectable } from '@nestjs/common'

@Injectable()
export class CoinsService {
  async list() {
    const response = await fetch(
      `${process.env.API_COINS}/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL,ARS-BRL,CHF-BRL,AUD-BRL,CNY-BRL,GBP-BRL,LTC-BRL`,
    )

    return response.json()
  }
}
