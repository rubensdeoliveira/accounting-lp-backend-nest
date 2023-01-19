import { Body, Controller, Post } from '@nestjs/common'

import { CreateSessionDTO } from '@/domain/authentication/dtos'
import { CreateSessionUseCase } from '@/domain/authentication/use-cases'

@Controller('sessions')
export class CreateSessionController {
  constructor(private readonly createSessionUseCase: CreateSessionUseCase) {}

  @Post('create')
  async handle(@Body() body: CreateSessionDTO) {
    const session = await this.createSessionUseCase.create(body)
    return session
  }
}
