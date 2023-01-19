import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/common/modules/database'
import {
  AddDaysDateGateway,
  AddHoursDateGateway,
  EtherealSendMailGateway,
} from '@/infra/common/gateways'

@Module({
  imports: [DatabaseModule],
  providers: [AddDaysDateGateway, AddHoursDateGateway, EtherealSendMailGateway],
})
export class CommonModule {}
