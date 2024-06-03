import * as dotenv from 'dotenv'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

dotenv.config({ path: '.env' })

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  AppModule.configure(app)
  await app.listen(process.env.PORT || 3333)
}
bootstrap()
