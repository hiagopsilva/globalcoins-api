import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DatabaseModule } from './database/database.module'

import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { envSchema } from './utils/config/env'
import { UsersModule } from './controllers/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'PG' ? '.env.dev' : '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
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
