import { IsEmail, IsString } from 'class-validator'

export class CreateSessionDTO {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string
}
