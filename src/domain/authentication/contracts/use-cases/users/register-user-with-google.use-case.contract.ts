import { RegisterUserWithGoogleDTO } from '@/domain/authentication/dtos'
import { UserModel } from '@/domain/authentication/models'

export interface RegisterUserWithGoogleUseCaseContract {
  register: (
    input: RegisterUserWithGoogleUseCaseContract.Input,
  ) => Promise<RegisterUserWithGoogleUseCaseContract.Output>
}

export namespace RegisterUserWithGoogleUseCaseContract {
  export type Input = RegisterUserWithGoogleDTO
  export type Output = Omit<UserModel, 'password'>
}
