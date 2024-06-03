import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ThrowHttpException } from 'src/utils/config/httpExceptions'
import { Users } from 'src/entities/User.entity'
import { enumMessageError } from 'src/utils/enums/message.error'
import { Repository } from 'typeorm'

import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(userPayload: UserType.payload) {
    const user = await this.userRepository.findOneBy({
      email: userPayload.email,
    })

    if (user) {
      ThrowHttpException(
        enumMessageError.USER.ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      )
    }

    const passwordHashed = await bcrypt.hash(userPayload.password, 10)

    return await this.userRepository.save({
      ...userPayload,
      password: passwordHashed,
    })
  }

  async list() {
    return await this.userRepository.find()
  }

  async update(userPayload: UserType.updatePayload) {
    const user = await this.userRepository.findOneBy({ id: userPayload.id })

    if (!user) {
      ThrowHttpException(enumMessageError.USER.NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    const userUpdated = await this.userRepository.update(userPayload.id, {
      ...userPayload,
    })

    if (!userUpdated) {
      ThrowHttpException(
        enumMessageError.USER.NOT_UPDATED,
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    return await this.userRepository.findBy({ id: userPayload.id })
  }

  async changePassword(userPayload: UserType.changePasswordPayload) {
    const user = await this.userRepository.findOneBy({ id: userPayload.id })

    if (!user) {
      ThrowHttpException(enumMessageError.USER.NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    if (userPayload.password !== userPayload.newPassword) {
      ThrowHttpException(
        enumMessageError.USER.PASSWORD_IS_NOT_SAME,
        HttpStatus.BAD_REQUEST,
      )
    }

    const userUpdated = await this.userRepository.update(userPayload.id, {
      password: userPayload.newPassword,
    })

    if (!userUpdated) {
      ThrowHttpException(
        enumMessageError.USER.NOT_UPDATED,
        HttpStatus.NOT_FOUND,
      )
    }

    return await this.userRepository.findBy({ id: userPayload.id })
  }

  async delete(userId: number) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    })

    if (!user) {
      ThrowHttpException(enumMessageError.USER.NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    await this.userRepository.update(userId, { deletedAt: new Date() })

    return { message: 'User deleted' }
  }
}
