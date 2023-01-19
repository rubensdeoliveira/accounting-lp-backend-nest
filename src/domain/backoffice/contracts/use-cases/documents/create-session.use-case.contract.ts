import { CreateDocumentDTO } from '@/domain/backoffice/dtos'

export interface CreateDocumentUseCaseContract {
  create: (
    input: CreateDocumentUseCaseContract.Input,
  ) => Promise<CreateDocumentUseCaseContract.Output>
}

export namespace CreateDocumentUseCaseContract {
  export type Input = CreateDocumentDTO
  export type Output = {
    access_token: string
    refresh_token: string
  }
}
