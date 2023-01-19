import { IsString } from 'class-validator'

export class CreateDocumentDTO {
  @IsString()
  token: string
}
