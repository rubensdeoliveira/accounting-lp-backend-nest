import { Body, Controller, Post } from '@nestjs/common'

import { CreateDocumentDTO } from '@/domain/authentication/dtos'
import { CreateDocumentUseCase } from '@/domain/authentication/use-cases'

@Controller('documents')
export class CreateDocumentController {
  constructor(private readonly createDocumentUseCase: CreateDocumentUseCase) {}

  @Post('create')
  async handle(@Body() body: CreateDocumentDTO) {
    const document = await this.createDocumentUseCase.create(body)
    return document
  }
}
