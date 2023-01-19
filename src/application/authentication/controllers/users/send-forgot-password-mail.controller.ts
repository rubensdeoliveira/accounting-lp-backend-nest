import { Body, Controller, Post } from '@nestjs/common'

import { SendForgotPasswordMailUseCase } from '@/domain/authentication/use-cases'
import { SendForgotPasswordMailDTO } from '@/domain/authentication/dtos'

@Controller('users')
export class SendForgotPasswordMailController {
  constructor(
    private readonly sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase,
  ) {}

  @Post('recover-password/send-mail')
  async handle(@Body() data: SendForgotPasswordMailDTO) {
    await this.sendForgotPasswordMailUseCase.send(data)
  }
}
