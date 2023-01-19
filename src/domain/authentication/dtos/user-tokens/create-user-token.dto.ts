import { IsDate, IsString } from 'class-validator'

export class CreateUserTokenDTO {
  @IsString()
  refresh_token: string

  @IsString()
  user_id: string

  @IsString()
  @IsDate()
  expires_date: Date
}
