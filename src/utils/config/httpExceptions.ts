/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus, Logger } from '@nestjs/common'

export function ThrowHttpException(
  message: string | object,
  code = HttpStatus.BAD_REQUEST,
  error?: any,
) {
  if (error) {
    Logger.error(error)
  }

  throw new HttpException(message, code)
}
