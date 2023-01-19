import { ConflictException, Injectable } from '@nestjs/common'

import { RegisterUserUseCaseContract } from '@/domain/authentication/contracts/use-cases'
import { UsersRepository } from '@/infra/authentication/repositories'
import { GenerateHashGateway } from '@/infra/authentication/gateways'

@Injectable()
export class RegisterUserUseCase implements RegisterUserUseCaseContract {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly generateHashGateway: GenerateHashGateway,
  ) {}

  async register(
    data: RegisterUserUseCaseContract.Input,
  ): Promise<RegisterUserUseCaseContract.Output> {
    const userByEmail = await this.usersRepository.findByEmail(data.email)
    if (userByEmail) {
      throw new ConflictException('Email already exists')
    }
    const hashedPassword = await this.generateHashGateway.generate(
      data.password,
    )
    const { password, ...createdUser } = await this.usersRepository.create({
      ...data,
      role: 'client',
      password: hashedPassword,
    })
    return createdUser
  }
}
