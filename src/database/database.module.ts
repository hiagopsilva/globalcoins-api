import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { dataSourceOptions } from '../../data-source'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
