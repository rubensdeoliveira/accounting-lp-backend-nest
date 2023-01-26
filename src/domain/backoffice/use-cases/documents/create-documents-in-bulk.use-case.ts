import { Injectable } from '@nestjs/common'

import { CreateDocumentsInBulkUseCaseContract } from '@/domain/backoffice/contracts/use-cases'
import { DocumentsRepository } from '@/infra/backoffice/repositories'
import { resolve } from 'path'
import { S3 } from 'aws-sdk'
import { readFile, unlink } from 'node:fs/promises'
import { UsersRepository } from '@/infra/authentication/repositories'
import { S3SaveStorageGateway } from '@/infra/common/gateways'

@Injectable()
export class CreateDocumentsInBulkUseCase
  implements CreateDocumentsInBulkUseCaseContract
{
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly s3SaveStorageGateway: S3SaveStorageGateway,
  ) {}

  async create({
    data,
    files,
  }: CreateDocumentsInBulkUseCaseContract.Input): Promise<CreateDocumentsInBulkUseCaseContract.Output> {
    try {
      const user = await this.usersRepository.findById(data.user_id)

      for (const file of files) {
        const fileCreated = await this.s3SaveStorageGateway.save({
          fileName: file.filename,
          folder: user.id,
        })
        console.log('fileCreated', fileCreated)
        const documentCreated = await this.documentsRepository.create({
          document_url: fileCreated,
          reference_date: new Date(data.reference_date),
          user_id: data.user_id,
        })
        console.log('documentCreated', documentCreated)
      }

      console.log('chegou aqui')
    } catch (err) {
      console.log(err)
    }
    // return fileName
    return { access_token: '', refresh_token: '' }
  }
}
