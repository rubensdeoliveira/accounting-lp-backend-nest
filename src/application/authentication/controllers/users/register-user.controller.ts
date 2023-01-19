import { Body, Controller, Post } from '@nestjs/common'

import { RegisterUserDTO } from '@/domain/authentication/dtos'
import { RegisterUserUseCase } from '@/domain/authentication/use-cases'

@Controller('users')
export class RegisterUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  async handle(@Body() body: RegisterUserDTO) {
    const user = await this.registerUserUseCase.register(body)
    return user
  }
}
