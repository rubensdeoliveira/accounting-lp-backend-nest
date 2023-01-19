import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/common/database'
import {
  FindUserByEmailRepositoryContract,
  CreateUserRepositoryContract,
  FindUserByIdRepositoryContract,
} from '@/domain/authentication/contracts/repositories'

@Injectable()
export class UsersRepository
  implements
    CreateUserRepositoryContract,
    FindUserByEmailRepositoryContract,
    FindUserByIdRepositoryContract
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateUserRepositoryContract.Input,
  ): Promise<CreateUserRepositoryContract.Output> {
    const userCreated = await this.prisma.user.create({
      data,
    })
    return userCreated
  }

  async findByEmail(
    email: FindUserByEmailRepositoryContract.Input,
  ): Promise<FindUserByEmailRepositoryContract.Output> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  async findById(
    id: FindUserByIdRepositoryContract.Input,
  ): Promise<FindUserByIdRepositoryContract.Output> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })
    return user
  }
}
