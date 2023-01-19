import { Controller, Get, Req } from '@nestjs/common'

import { GetUserUseCase } from '@/domain/authentication/use-cases'

@Controller('users')
export class GetUserController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @Get('me')
  async handle(@Req() req: Request & { user_id: string }) {
    const user = await this.getUserUseCase.get(req.user_id)
    return user
  }
}
