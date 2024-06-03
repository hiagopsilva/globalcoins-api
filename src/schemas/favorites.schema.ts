import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class Favorite {
  @Prop()
  userId: number

  @Prop()
  coin: string
}

export type FavoriteDocumentType = HydratedDocument<Favorite>

export const FavoriteSchema = SchemaFactory.createForClass(Favorite)
