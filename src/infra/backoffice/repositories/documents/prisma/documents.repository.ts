import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/common/database'
import { CreateDocumentRepositoryContract } from '@/domain/backoffice/contracts/repositories'

@Injectable()
export class DocumentsRepository implements CreateDocumentRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateDocumentRepositoryContract.Input,
  ): Promise<CreateDocumentRepositoryContract.Output> {
    const documentCreated = await this.prisma.document.create({
      data,
    })
    return documentCreated
  }
}
