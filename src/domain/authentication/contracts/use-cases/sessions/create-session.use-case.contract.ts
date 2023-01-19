import { CreateSessionDTO } from '@/domain/authentication/dtos'
import { UserModel } from '@/domain/authentication/models'

export interface CreateSessionUseCaseContract {
  create: (
    input: CreateSessionUseCaseContract.Input,
  ) => Promise<CreateSessionUseCaseContract.Output>
}

export namespace CreateSessionUseCaseContract {
  export type Input = CreateSessionDTO
  export type Output = {
    user: Omit<UserModel, 'password'>
    access_token: string
    refresh_token: string
  }
}
