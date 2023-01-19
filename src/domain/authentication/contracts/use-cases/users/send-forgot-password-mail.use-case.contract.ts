import { SendForgotPasswordMailDTO } from '@/domain/authentication/dtos'

export interface SendForgotPasswordMailUseCaseContract {
  send: (data: SendForgotPasswordMailUseCaseContract.Input) => Promise<void>
}

export namespace SendForgotPasswordMailUseCaseContract {
  export type Input = SendForgotPasswordMailDTO
}
