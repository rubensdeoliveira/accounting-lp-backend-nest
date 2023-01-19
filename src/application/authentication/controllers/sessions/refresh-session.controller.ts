import { Body, Controller, Post } from '@nestjs/common'

import { RefreshSessionDTO } from '@/domain/authentication/dtos'
import { RefreshSessionUseCase } from '@/domain/authentication/use-cases'

@Controller('sessions')
export class RefreshSessionController {
  constructor(private readonly refreshSessionUseCase: RefreshSessionUseCase) {}

  @Post('refresh')
  async handle(@Body() body: RefreshSessionDTO) {
    const session = await this.refreshSessionUseCase.refresh(body)
    return session
  }
}
