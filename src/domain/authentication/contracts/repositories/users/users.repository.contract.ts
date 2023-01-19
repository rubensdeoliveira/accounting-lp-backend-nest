import { UserModel } from '@/domain/authentication/models'

export interface CreateUserRepositoryContract {
  create: (
    input: CreateUserRepositoryContract.Input,
  ) => Promise<CreateUserRepositoryContract.Output>
}

export namespace CreateUserRepositoryContract {
  export type Input = {
    email: string
    name: string
    last_name: string
    phone: string
    password: string
    role: 'admin' | 'client'
  }
  export type Output = UserModel
}

export interface FindUserByEmailRepositoryContract {
  findByEmail: (
    input: FindUserByEmailRepositoryContract.Input,
  ) => Promise<FindUserByEmailRepositoryContract.Output>
}

export namespace FindUserByEmailRepositoryContract {
  export type Input = string
  export type Output = UserModel
}

export interface FindUserByIdRepositoryContract {
  findById: (
    input: FindUserByIdRepositoryContract.Input,
  ) => Promise<FindUserByIdRepositoryContract.Output>
}

export namespace FindUserByIdRepositoryContract {
  export type Input = string
  export type Output = UserModel
}
