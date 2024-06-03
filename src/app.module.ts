import { INestApplication, Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DatabaseModule } from './database/database.module'

import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { envSchema } from './utils/config/env'
import { UsersModule } from './controllers/users/users.module'
import { AuthModule } from './controllers/auth/auth.module'
import { CoinsModule } from './controllers/coins/coins.module'

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'LOCAL' ? '.env.local' : '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CoinsModule,
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

  static async configure(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Global Coins API')
      .setDescription(
        'Projeto desenvolvido com a finalidade de listagem de moedas.',
      )
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }
}
