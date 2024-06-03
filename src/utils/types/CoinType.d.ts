declare namespace CoinType {
  type Item = {
    code: string
    codein: string
    name: string
    high: string
    low: string
    varBid: string
    pctChange: string
    bid: string
    ask: string
    timestamp: string
    create_date: string
  }

  type List = Item[]

  type GetHistoric = {
    days: number
    coin: string
  }
}
