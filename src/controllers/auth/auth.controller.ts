import { Body, Controller, Post, UsePipes } from '@nestjs/common'

import { zodValidatorPipe } from 'src/utils/config/zodValidatorPipe'
import { AuthService } from './auth.service'
import { AuthPipe } from 'src/pipes/auth/auth.pipe'
import { enumMessageError } from 'src/utils/enums/message.error'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'email@gmail.com',
        },
        password: {
          type: 'string',
          example: '123',
        },
      },
    },
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: enumMessageError.USER.NOT_FOUND,
  })
  @ApiResponse({
    status: 401,
    description: enumMessageError.AUTH.INVALID_PASSWORD,
  })
  @Post('')
  @UsePipes(new zodValidatorPipe(AuthPipe))
  signIn(@Body() payloadAuth: AuthType.item) {
    return this.authService.auth(payloadAuth)
  }
}
