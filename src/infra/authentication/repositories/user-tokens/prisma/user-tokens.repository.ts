import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/common/database'
import {
  CreateUserTokenRepositoryContract,
  DeleteUserTokenByIdRepositoryContract,
  FindUserTokenByUserIdAndRefreshTokenRepositoryContract,
} from '@/domain/authentication/contracts/repositories'

@Injectable()
export class UserTokensRepository
  implements
    CreateUserTokenRepositoryContract,
    FindUserTokenByUserIdAndRefreshTokenRepositoryContract,
    DeleteUserTokenByIdRepositoryContract
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateUserTokenRepositoryContract.Input,
  ): Promise<CreateUserTokenRepositoryContract.Output> {
    const tokenCreated = await this.prisma.userToken.create({
      data,
    })
    return tokenCreated
  }

  async findByUserIdAndRefreshToken(
    data: FindUserTokenByUserIdAndRefreshTokenRepositoryContract.Input,
  ): Promise<FindUserTokenByUserIdAndRefreshTokenRepositoryContract.Output> {
    const tokenFinded = await this.prisma.userToken.findFirst({
      where: { user_id: data.user_id, refresh_token: data.refresh_token },
    })
    return tokenFinded
  }

  async deleteById(
    id: DeleteUserTokenByIdRepositoryContract.Input,
  ): Promise<void> {
    await this.prisma.userToken.delete({
      where: { id },
    })
  }
}
