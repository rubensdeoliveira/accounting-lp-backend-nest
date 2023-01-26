import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { AuthMiddlewareCreator } from '@/application/authentication/middlewares'
import { CreateDocumentsInBulkController } from '@/application/backoffice/controllers'
import { CreateDocumentsInBulkUseCase } from '@/domain/backoffice/use-cases'
import { DocumentsRepository } from '@/infra/backoffice/repositories'
import { PrismaService } from '@/infra/common/database'
import { UsersRepository } from '@/infra/authentication/repositories'
import { VerifyJwtGateway } from '@/infra/authentication/gateways'
import { S3SaveStorageGateway } from '@/infra/common/gateways'

@Module({
  controllers: [CreateDocumentsInBulkController],
  providers: [
    CreateDocumentsInBulkUseCase,
    DocumentsRepository,
    PrismaService,
    UsersRepository,
    VerifyJwtGateway,
    S3SaveStorageGateway,
  ],
})
export class DocumentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        AuthMiddlewareCreator({
          roles: ['admin'],
        }),
      )
      .forRoutes({ path: 'documents/create', method: RequestMethod.POST })
  }
}
