import { diskStorage } from 'multer'
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'

import {
  fileDestinationHelper,
  fileImageFilterHelper,
} from '@/application/common/helpers'
import { CreateDocumentsInBulkDTO } from '@/domain/backoffice/dtos'
import { CreateDocumentsInBulkUseCase } from '@/domain/backoffice/use-cases'

@Controller('documents')
export class CreateDocumentsInBulkController {
  constructor(
    private readonly createDocumentsInBulkUseCase: CreateDocumentsInBulkUseCase,
  ) {}

  @Post('create')
  @UseInterceptors(
    FilesInterceptor('files', null, {
      storage: diskStorage({
        destination: './files',
        filename: fileDestinationHelper,
      }),
      limits: { fileSize: 52428800 },
      fileFilter: fileImageFilterHelper,
    }),
  )
  async createDocumentsInBulk(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: CreateDocumentsInBulkDTO,
  ) {
    return await this.createDocumentsInBulkUseCase.create({ data, files })
  }
}
