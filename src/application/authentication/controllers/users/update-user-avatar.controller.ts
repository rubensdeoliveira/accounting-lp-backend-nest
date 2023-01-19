import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'

import { UpdateUserAvatarUseCase } from '@/domain/authentication/use-cases'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import {
  fileDestinationHelper,
  fileFilterHelper,
} from '@/application/common/helpers'

@Controller('users')
export class UpdateUserAvatarController {
  constructor(
    private readonly updateUserAvatarUseCase: UpdateUserAvatarUseCase,
  ) {}

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: fileDestinationHelper,
      }),
      limits: { fileSize: 10485760 },
      fileFilter: fileFilterHelper,
    }),
  )
  async handle(
    @Req() req: Request & { user_id: string },
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('Image was not provided')
    }
    return await this.updateUserAvatarUseCase.update({
      image,
      user_id: req.user_id,
    })
  }
}
