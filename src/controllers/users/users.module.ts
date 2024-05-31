import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from 'src/entities/User.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
