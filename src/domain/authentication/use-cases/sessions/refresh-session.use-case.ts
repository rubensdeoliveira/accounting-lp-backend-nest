import { ConflictException, Injectable } from '@nestjs/common'

import { UserTokensRepository } from '@/infra/authentication/repositories'
import { RefreshSessionUseCaseContract } from '@/domain/authentication/contracts/use-cases'
import {
  SignJwtGateway,
  VerifyJwtGateway,
} from '@/infra/authentication/gateways'
import { AddDaysDateGateway } from '@/infra/common/gateways'
import { JwtPayloadModel } from '@/domain/authentication/models'

@Injectable()
export class RefreshSessionUseCase implements RefreshSessionUseCaseContract {
  constructor(
    private readonly userTokensRepository: UserTokensRepository,
    private readonly verifyJwtGateway: VerifyJwtGateway,
    private readonly signJwtGateway: SignJwtGateway,
    private readonly addDaysDateGateway: AddDaysDateGateway,
  ) {}

  async refresh(
    data: RefreshSessionUseCaseContract.Input,
  ): Promise<RefreshSessionUseCaseContract.Output> {
    const decode = this.verifyJwtGateway.verify({
      token: data.token,
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    })
    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken({
        user_id: decode.id,
        refresh_token: data.token,
      })
    if (!userToken) {
      throw new ConflictException('Refresh token does not exists')
    }
    await this.userTokensRepository.deleteById(userToken.id)
    const payload: JwtPayloadModel = {
      id: decode.id,
      role: decode.role,
    }
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
      user_id: decode.id,
    })
    const access_token = this.signJwtGateway.sign({
      payload,
      secret: process.env.JWT_TOKEN_SECRET,
      expires_in: process.env.JWT_TOKEN_EXPIRES_IN,
    })
    return { refresh_token, access_token }
  }
}
