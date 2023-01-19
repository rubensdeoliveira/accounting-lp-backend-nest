import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { CompareHashGatewayContract } from '@/domain/authentication/contracts/gateways'

@Injectable()
export class CompareHashGateway implements CompareHashGatewayContract {
  async compare(
    data: CompareHashGatewayContract.Input,
  ): Promise<CompareHashGatewayContract.Output> {
    const isEqual = await bcrypt.compare(data.value, data.hashedValue)
    return isEqual
  }
}
