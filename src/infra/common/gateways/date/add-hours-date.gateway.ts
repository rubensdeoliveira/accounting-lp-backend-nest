import { Injectable } from '@nestjs/common'
import { addHours } from 'date-fns'

import { AddHoursDateGatewayContract } from '@/domain/common/contracts/gateways'

@Injectable()
export class AddHoursDateGateway implements AddHoursDateGatewayContract {
  async add(
    data: AddHoursDateGatewayContract.Input,
  ): Promise<AddHoursDateGatewayContract.Output> {
    const dateWithAddedHours = addHours(data.date, data.hours)
    return dateWithAddedHours
  }
}
