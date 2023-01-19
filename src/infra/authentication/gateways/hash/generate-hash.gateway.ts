import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { GenerateHashGatewayContract } from '@/domain/authentication/contracts/gateways'

@Injectable()
export class GenerateHashGateway implements GenerateHashGatewayContract {
  async generate(
    value: GenerateHashGatewayContract.Input,
  ): Promise<GenerateHashGatewayContract.Output> {
    const salt = await bcrypt.genSalt()
    const hashedValue = await bcrypt.hash(value, salt)
    return hashedValue
  }
}
