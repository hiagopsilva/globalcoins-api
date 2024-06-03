import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import { DatabaseService } from './database.service'

import * as dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'LOCAL' ? '.env.local' : '.env',
})

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      inject: [DatabaseService],
    }),
    MongooseModule.forRoot(process.env.DB_URL_MONGO),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
