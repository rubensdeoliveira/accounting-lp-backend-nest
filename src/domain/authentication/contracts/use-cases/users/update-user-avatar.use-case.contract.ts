import { UpdateUserAvatarDTO } from '@/domain/authentication/dtos'
import { UserModel } from '@/domain/authentication/models'

export interface UpdateUserAvatarUseCaseContract {
  update: (input: UpdateUserAvatarUseCaseContract.Input) => Promise<void>
}

export namespace UpdateUserAvatarUseCaseContract {
  export type Input = { user_id: string; image: Express.Multer.File }
}
