import { Injectable } from '@nestjs/common'
import { addDays } from 'date-fns'

import { AddDaysDateGatewayContract } from '@/domain/common/contracts/gateways'

@Injectable()
export class AddDaysDateGateway implements AddDaysDateGatewayContract {
  async add(
    data: AddDaysDateGatewayContract.Input,
  ): Promise<AddDaysDateGatewayContract.Output> {
    const dateWithAddedDays = addDays(data.date, data.days)
    return dateWithAddedDays
  }
}
