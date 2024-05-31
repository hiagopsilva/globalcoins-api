import { Body, Controller, Post, UsePipes } from '@nestjs/common'

import { zodValidatorPipe } from 'src/utils/config/zodValidatorPipe'
import { AuthService } from './auth.service'
import { AuthPipe } from 'src/pipes/auth/auth.pipe'

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  @UsePipes(new zodValidatorPipe(AuthPipe))
  signIn(@Body() payloadAuth: AuthType.item) {
    return this.authService.auth(payloadAuth)
  }
}
