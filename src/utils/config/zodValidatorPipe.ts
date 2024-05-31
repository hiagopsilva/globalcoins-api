import { PipeTransform } from '@nestjs/common'
import { ThrowHttpException } from 'src/utils/config/httpExceptions'
import { ZodError, ZodSchema } from 'zod'

export class zodValidatorPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        ThrowHttpException({
          message: 'Validation Failed',
          statusCode: 400,
          errors: error,
        })
      }

      ThrowHttpException('Validation failed')
    }
    return value
  }
}
