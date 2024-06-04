import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class Coin {
  @Prop()
  data: string
}

export type CoinDocumentType = HydratedDocument<Coin>

export const CoinSchema = SchemaFactory.createForClass(Coin)
