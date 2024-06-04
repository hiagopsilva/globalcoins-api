import { Module } from '@nestjs/common'
import { CoinsService } from './coins.service'
import { CoinsController } from './coins.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Favorite, FavoriteSchema } from 'src/schemas/favorites.schema'
import { AppGateway } from 'src/app.gateway'
import { Coin, CoinSchema } from 'src/schemas/coin.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
    MongooseModule.forFeature([{ name: Coin.name, schema: CoinSchema }]),
  ],
  controllers: [CoinsController],
  providers: [CoinsService, AppGateway],
})
export class CoinsModule {}
