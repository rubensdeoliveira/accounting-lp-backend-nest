import { Injectable } from '@nestjs/common'
import { verify } from 'jsonwebtoken'

import { VerifyJwtGatewayContract } from '@/domain/authentication/contracts/gateways'
import { JwtPayloadModel } from '@/domain/authentication/models'

@Injectable()
export class VerifyJwtGateway implements VerifyJwtGatewayContract {
  verify(
    data: VerifyJwtGatewayContract.Input,
  ): VerifyJwtGatewayContract.Output {
    const payload = verify(data.token, data.secret) as JwtPayloadModel
    return payload
  }
}
