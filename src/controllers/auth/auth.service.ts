import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcrypt'
import { ThrowHttpException } from 'src/utils/config/httpExceptions'
import { Users } from 'src/entities/User.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { enumMessageError } from 'src/utils/enums/message.error'

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async auth({ email, password }: AuthType.item) {
    const user = await this.userRepository.findOne({
      where: { email },
    })

    if (!user) ThrowHttpException(enumMessageError.USER.NOT_FOUND)

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      ThrowHttpException(enumMessageError.AUTH.INVALID_PASSWORD)
    }

    return {
      access_token: await this.JwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  }
}
