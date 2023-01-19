import { Injectable, UnauthorizedException } from '@nestjs/common'

import {
  UsersRepository,
  UserTokensRepository,
} from '@/infra/authentication/repositories'
import { CreateDocumentUseCaseContract } from '@/domain/backoffice/contracts/use-cases'
import {
  CompareHashGateway,
  SignJwtGateway,
} from '@/infra/authentication/gateways'
import { JwtPayloadModel } from '@/domain/authentication/models'
import { AddDaysDateGateway } from '@/infra/common/gateways'

@Injectable()
export class CreateDocumentUseCase implements CreateDocumentUseCaseContract {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userTokensRepository: UserTokensRepository,
    private readonly compareHashGateway: CompareHashGateway,
    private readonly signJwtGateway: SignJwtGateway,
    private readonly addDaysDateGateway: AddDaysDateGateway,
  ) {}

  async create(
    data: CreateDocumentUseCaseContract.Input,
  ): Promise<CreateDocumentUseCaseContract.Output> {}
}
