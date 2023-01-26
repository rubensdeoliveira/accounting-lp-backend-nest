import { CreateDocumentsInBulkDTO } from '@/domain/backoffice/dtos'

export interface CreateDocumentsInBulkUseCaseContract {
  create: (
    input: CreateDocumentsInBulkUseCaseContract.Input,
  ) => Promise<CreateDocumentsInBulkUseCaseContract.Output>
}

export namespace CreateDocumentsInBulkUseCaseContract {
  export type Input = {
    data: CreateDocumentsInBulkDTO
    files: Express.Multer.File[]
  }
  export type Output = {
    access_token: string
    refresh_token: string
  }
}
