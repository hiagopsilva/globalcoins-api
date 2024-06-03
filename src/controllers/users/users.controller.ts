import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { UsersService } from 'src/controllers/users/users.service'
import { zodValidatorPipe } from 'src/utils/config/zodValidatorPipe'
import { createUserValidator } from 'src/pipes/users/create-user.pipe'
import { updateUserValidator } from 'src/pipes/users/update-user.pipe'
import { z } from 'zod'
import { AuthGuard } from '../auth/auth.guard'
import { changePasswordValidator } from 'src/pipes/users/change-password.pipe'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(createUserValidator))
  @Post('create')
  async create(@Body() userBody: UserType.payload) {
    const userPayloadSchema = userBody

    return await this.usersService.create(userPayloadSchema)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async list() {
    return await this.usersService.list()
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(updateUserValidator))
  @Put('update')
  async update(@Body() userBody: UserType.updatePayload) {
    const userPayloadSchema = userBody

    return await this.usersService.update(userPayloadSchema)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(changePasswordValidator))
  @Post('change-password')
  async changePassword(
    @Body() userPayloadSchema: UserType.changePasswordPayload,
  ) {
    return await this.usersService.changePassword(userPayloadSchema)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(z.string()))
  @Delete('delete')
  delete(@Query('id') userIdQuery: number) {
    const userId = userIdQuery

    return this.usersService.delete(userId)
  }
}
