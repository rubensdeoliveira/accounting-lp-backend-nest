import { RegisterUserDTO } from '@/domain/authentication/dtos'
import { UserModel } from '@/domain/authentication/models'

export interface RegisterUserUseCaseContract {
  register: (
    input: RegisterUserUseCaseContract.Input,
  ) => Promise<RegisterUserUseCaseContract.Output>
}

export namespace RegisterUserUseCaseContract {
  export type Input = RegisterUserDTO
  export type Output = Omit<UserModel, 'password'>
}
