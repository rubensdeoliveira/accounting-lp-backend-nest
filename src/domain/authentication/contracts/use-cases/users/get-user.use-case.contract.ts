import { UserModel } from '@/domain/authentication/models'

export interface GetUserUseCaseContract {
  get: (
    input: GetUserUseCaseContract.Input,
  ) => Promise<GetUserUseCaseContract.Output>
}

export namespace GetUserUseCaseContract {
  export type Input = string
  export type Output = Omit<UserModel, 'password'>
}
