import { IsString } from 'class-validator'

export class RegisterUserWithGoogleDTO {
  @IsString()
  token: string

  @IsString()
  phone: string

  @IsString()
  password: string
}
