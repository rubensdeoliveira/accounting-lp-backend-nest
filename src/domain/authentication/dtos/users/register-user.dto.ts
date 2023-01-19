import { IsEmail, IsString } from 'class-validator'

export class RegisterUserDTO {
  @IsString()
  name: string

  @IsString()
  last_name: string

  @IsString()
  phone: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}
