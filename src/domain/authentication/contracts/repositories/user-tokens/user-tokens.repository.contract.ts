import { CreateUserTokenDTO } from '@/domain/authentication/dtos'
import { UserTokenModel } from '@/domain/authentication/models'

export interface CreateUserTokenRepositoryContract {
  create: (
    input: CreateUserTokenRepositoryContract.Input,
  ) => Promise<CreateUserTokenRepositoryContract.Output>
}

export namespace CreateUserTokenRepositoryContract {
  export type Input = CreateUserTokenDTO
  export type Output = UserTokenModel
}

export interface FindUserTokenByUserIdAndRefreshTokenRepositoryContract {
  findByUserIdAndRefreshToken: (
    input: FindUserTokenByUserIdAndRefreshTokenRepositoryContract.Input,
  ) => Promise<FindUserTokenByUserIdAndRefreshTokenRepositoryContract.Output>
}

export namespace FindUserTokenByUserIdAndRefreshTokenRepositoryContract {
  export type Input = { user_id: string; refresh_token: string }
  export type Output = UserTokenModel
}

export interface DeleteUserTokenByIdRepositoryContract {
  deleteById: (
    input: DeleteUserTokenByIdRepositoryContract.Input,
  ) => Promise<void>
}

export namespace DeleteUserTokenByIdRepositoryContract {
  export type Input = string
}
