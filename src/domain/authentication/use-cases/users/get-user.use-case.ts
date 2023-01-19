import { Injectable, NotFoundException } from '@nestjs/common'

import { GetUserUseCaseContract } from '@/domain/authentication/contracts/use-cases'
import { UsersRepository } from '@/infra/authentication/repositories'

@Injectable()
export class GetUserUseCase implements GetUserUseCaseContract {
  constructor(private readonly usersRepository: UsersRepository) {}

  async get(
    id: GetUserUseCaseContract.Input,
  ): Promise<GetUserUseCaseContract.Output> {
    const user = await this.usersRepository.findById(id)
    if (!user) {
      throw new NotFoundException('User does not exists')
    }
    const { password, ...userGetted } = user
    return userGetted
  }
}
