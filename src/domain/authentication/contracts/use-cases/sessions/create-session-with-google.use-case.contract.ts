import { CreateSessionWithGoogleDTO } from '@/domain/authentication/dtos'
import { UserModel } from '@/domain/authentication/models'

export interface CreateSessionWithGoogleUseCaseContract {
  create: (
    input: CreateSessionWithGoogleUseCaseContract.Input,
  ) => Promise<CreateSessionWithGoogleUseCaseContract.Output>
}

export namespace CreateSessionWithGoogleUseCaseContract {
  export type Input = CreateSessionWithGoogleDTO
  export type Output = {
    user: Omit<UserModel, 'password'>
    access_token: string
    refresh_token: string
  }
}
