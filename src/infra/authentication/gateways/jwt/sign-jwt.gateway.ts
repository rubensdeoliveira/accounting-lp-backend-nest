import { Injectable } from '@nestjs/common'
import { sign } from 'jsonwebtoken'

import { SignJwtGatewayContract } from '@/domain/authentication/contracts/gateways'

@Injectable()
export class SignJwtGateway implements SignJwtGatewayContract {
  sign(data: SignJwtGatewayContract.Input): SignJwtGatewayContract.Output {
    const token = sign(data.payload, data.secret, {
      expiresIn: data.expires_in,
    })
    return token
  }
}
