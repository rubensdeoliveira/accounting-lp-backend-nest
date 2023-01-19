import { IsString } from 'class-validator'

export class RefreshSessionDTO {
  @IsString()
  token: string
}
