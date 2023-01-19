import { DocumentModel } from '@/domain/backoffice/models'

export interface CreateDocumentRepositoryContract {
  create: (
    input: CreateDocumentRepositoryContract.Input,
  ) => Promise<CreateDocumentRepositoryContract.Output>
}

export namespace CreateDocumentRepositoryContract {
  export type Input = {
    email: string
    name: string
    last_name: string
    phone: string
    password: string
    role: 'admin' | 'client'
  }
  export type Output = DocumentModel
}
