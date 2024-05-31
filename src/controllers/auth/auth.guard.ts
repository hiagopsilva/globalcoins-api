import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { ThrowHttpException } from 'src/utils/config/httpExceptions'
import { jwtConstants } from 'src/utils/constants/jwt.constant'
import { enumMessageError } from 'src/utils/enums/message.error'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new ThrowHttpException(enumMessageError.API.TOKEN, 400)
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      })

      request.user = payload
    } catch {
      throw new ThrowHttpException(enumMessageError.API.TOKEN, 400)
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
