import { IsString } from 'class-validator'

export class CreateSessionWithGoogleDTO {
  @IsString()
  token: string
}
