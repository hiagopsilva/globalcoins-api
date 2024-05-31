import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// import { dataSourceOptions } from '../../data-source'

import { DatabaseService } from './database.service'

import * as dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'LOCAL' ? '.env.local' : '.env',
})

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   ...dataSourceOptions,
    //   autoLoadEntities: true,
    // }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      inject: [DatabaseService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
