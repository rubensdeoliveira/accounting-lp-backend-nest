import { v4 as uuid } from 'uuid'
import { extname } from 'path'

export const fileDestinationHelper = (_: any, file: any, cb: any) => {
  cb(null, `${uuid()}${extname(file.originalname)}`)
}
