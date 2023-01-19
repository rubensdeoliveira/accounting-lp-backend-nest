import { Injectable } from '@nestjs/common'
import { decode } from 'jsonwebtoken'

import { DecodeJwtGatewayContract } from '@/domain/authentication/contracts/gateways'
import { JwtPayloadModel } from '@/domain/authentication/models'

@Injectable()
export class DecodeJwtGateway implements DecodeJwtGatewayContract {
  decode(
    token: DecodeJwtGatewayContract.Input,
  ): DecodeJwtGatewayContract.Output {
    const payload = decode(token) as JwtPayloadModel
    return payload
  }
}
