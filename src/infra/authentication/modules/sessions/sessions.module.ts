import { Module } from '@nestjs/common'

import {
  CreateSessionController,
  RefreshSessionController,
} from '@/application/authentication/controllers'
import {
  CreateSessionUseCase,
  RefreshSessionUseCase,
} from '@/domain/authentication/use-cases'
import {
  UsersRepository,
  UserTokensRepository,
} from '@/infra/authentication/repositories'
import { PrismaService } from '@/infra/common/database'
import {
  CompareHashGateway,
  DecodeJwtGateway,
  SignJwtGateway,
  VerifyJwtGateway,
} from '@/infra/authentication/gateways'
import { AddDaysDateGateway } from '@/infra/common/gateways'

@Module({
  controllers: [CreateSessionController, RefreshSessionController],
  providers: [
    CreateSessionUseCase,
    RefreshSessionUseCase,
    UsersRepository,
    PrismaService,
    CompareHashGateway,
    SignJwtGateway,
    VerifyJwtGateway,
    DecodeJwtGateway,
    UserTokensRepository,
    AddDaysDateGateway,
  ],
  imports: [],
  exports: [CreateSessionUseCase, VerifyJwtGateway],
})
export class SessionsModule {}
