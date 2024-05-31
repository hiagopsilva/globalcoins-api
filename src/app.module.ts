import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DatabaseModule } from './database/database.module'

import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'DEV'
          ? '.env.dev'
          : process.env.NODE_ENV === 'HML'
            ? '.env.hml'
            : '.env.prd',
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
