import { Module } from '@nestjs/common'

import { DocumentsModule } from '@/infra/backoffice/modules/documents'

@Module({
  imports: [DocumentsModule],
})
export class BackofficeModule {}
