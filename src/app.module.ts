import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DatabaseModule } from './database/database.module'

import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { envSchema } from './utils/config/env'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    if (dataSource.isInitialized) {
      Logger.log('Database connected!', 'LOGGER')
    } else {
      Logger.log('Database not connected!', 'LOGGER')
    }
  }
}
