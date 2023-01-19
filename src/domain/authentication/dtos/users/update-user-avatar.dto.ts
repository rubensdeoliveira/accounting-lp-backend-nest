import { IsString, IsUUID } from 'class-validator'

export class UpdateUserAvatarDTO {
  @IsUUID()
  user_id: string
}
