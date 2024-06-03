import { Module } from '@nestjs/common'
import { CoinsService } from './coins.service'
import { CoinsController } from './coins.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Favorite, FavoriteSchema } from 'src/schemas/favorites.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
  controllers: [CoinsController],
  providers: [CoinsService],
})
export class CoinsModule {}
