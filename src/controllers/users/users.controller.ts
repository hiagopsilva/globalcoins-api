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
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { enumMessageError } from 'src/utils/enums/message.error'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Nome',
        },
        lastName: {
          type: 'string',
          example: 'Sobrenome',
        },
        email: {
          type: 'string',
          example: 'email@gmail.com',
        },
        password: {
          type: 'string',
          example: '123',
        },
        confirmPassword: {
          type: 'string',
          example: '123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 409,
    description: enumMessageError.USER.ALREADY_EXISTS,
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(createUserValidator))
  @Post('create')
  async create(@Body() userBody: UserType.payload) {
    const userPayloadSchema = userBody

    return await this.usersService.create(userPayloadSchema)
  }

  @ApiResponse({
    status: 200,
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async list() {
    return await this.usersService.list()
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Nome',
        },
        lastName: {
          type: 'string',
          example: 'Sobrenome',
        },
        email: {
          type: 'string',
          example: 'email@gmail.com',
        },
        password: {
          type: 'string',
          example: '123',
        },
        confirmPassword: {
          type: 'string',
          example: '123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 404,
    description: enumMessageError.USER.NOT_FOUND,
  })
  @ApiResponse({
    status: 422,
    description: enumMessageError.USER.NOT_UPDATED,
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(updateUserValidator))
  @Put('update')
  async update(@Body() userBody: UserType.updatePayload) {
    const userPayloadSchema = userBody

    return await this.usersService.update(userPayloadSchema)
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
        password: {
          type: 'string',
          example: '123',
        },
        newPassword: {
          type: 'string',
          example: '123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 400,
    description: enumMessageError.USER.PASSWORD_IS_NOT_SAME,
  })
  @ApiResponse({
    status: 404,
    description: enumMessageError.USER.NOT_FOUND,
  })
  @ApiResponse({
    status: 422,
    description: enumMessageError.USER.NOT_UPDATED,
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(changePasswordValidator))
  @Post('change-password')
  async changePassword(
    @Body() userPayloadSchema: UserType.changePasswordPayload,
  ) {
    return await this.usersService.changePassword(userPayloadSchema)
  }

  @ApiQuery({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: '1',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 404,
    description: enumMessageError.USER.NOT_FOUND,
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new zodValidatorPipe(z.string()))
  @Delete('delete')
  delete(@Query('id') userIdQuery: number) {
    const userId = userIdQuery

    return this.usersService.delete(userId)
  }
}
