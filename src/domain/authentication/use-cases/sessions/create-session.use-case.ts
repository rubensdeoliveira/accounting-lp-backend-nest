import { Injectable, UnauthorizedException } from '@nestjs/common'

import {
  UsersRepository,
  UserTokensRepository,
} from '@/infra/authentication/repositories'
import { CreateSessionUseCaseContract } from '@/domain/authentication/contracts/use-cases'
import {
  CompareHashGateway,
  SignJwtGateway,
} from '@/infra/authentication/gateways'
import { JwtPayloadModel } from '@/domain/authentication/models'
import { AddDaysDateGateway } from '@/infra/common/gateways'

@Injectable()
export class CreateSessionUseCase implements CreateSessionUseCaseContract {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userTokensRepository: UserTokensRepository,
    private readonly compareHashGateway: CompareHashGateway,
    private readonly signJwtGateway: SignJwtGateway,
    private readonly addDaysDateGateway: AddDaysDateGateway,
  ) {}

  async create(
    data: CreateSessionUseCaseContract.Input,
  ): Promise<CreateSessionUseCaseContract.Output> {
    const findUserByEmail = await this.usersRepository.findByEmail(data.email)
    if (!findUserByEmail) {
      throw new UnauthorizedException('Email/password does not matches')
    }
    const { password, ...userWithoutPassword } = findUserByEmail
    const passwordIsMatched = await this.compareHashGateway.compare({
      hashedValue: password,
      value: data.password,
    })
    if (!passwordIsMatched) {
      throw new UnauthorizedException('Email/password does not matches')
    }
    const payload: JwtPayloadModel = {
      id: findUserByEmail.id,
      role: findUserByEmail.role,
    }
    const access_token = this.signJwtGateway.sign({
      payload,
      secret: process.env.JWT_TOKEN_SECRET,
      expires_in: process.env.JWT_TOKEN_EXPIRES_IN,
    })
    const refresh_token = this.signJwtGateway.sign({
      payload,
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    })
    const expires_date = await this.addDaysDateGateway.add({
      date: new Date(),
      days: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS),
    })
    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id: findUserByEmail.id,
    })
    return { user: userWithoutPassword, access_token, refresh_token }
  }
}
