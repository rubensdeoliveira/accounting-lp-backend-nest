import { HttpException, HttpStatus } from '@nestjs/common'
import { extname } from 'path'

export const fileImageFilterHelper = (_: any, file: any, cb: any) => {
  if (file.mimetype.match(/\/(png|jpg|jpeg|gif)$/)) {
    cb(null, true)
  } else {
    cb(
      new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    )
  }
}
