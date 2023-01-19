import { IsString } from 'class-validator'

export class SendForgotPasswordMailDTO {
  @IsString()
  email: string
}
