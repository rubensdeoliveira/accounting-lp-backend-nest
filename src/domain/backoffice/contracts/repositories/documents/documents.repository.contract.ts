import { DocumentModel } from '@/domain/backoffice/models'

export interface CreateDocumentRepositoryContract {
  create: (
    input: CreateDocumentRepositoryContract.Input,
  ) => Promise<CreateDocumentRepositoryContract.Output>
}

export namespace CreateDocumentRepositoryContract {
  export type Input = {
    user_id: string
    reference_date: Date
    document_url: string
  }
  export type Output = DocumentModel
}
