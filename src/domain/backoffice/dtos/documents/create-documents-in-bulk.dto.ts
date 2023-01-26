import { IsDateString, IsString } from 'class-validator'

export class CreateDocumentsInBulkDTO {
  @IsDateString()
  reference_date: string

  @IsString()
  user_id: string
}
