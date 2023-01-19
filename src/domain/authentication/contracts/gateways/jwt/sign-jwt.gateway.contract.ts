import { JwtPayloadModel } from '@/domain/authentication/models'

export interface SignJwtGatewayContract {
  sign: (input: SignJwtGatewayContract.Input) => SignJwtGatewayContract.Output
}

export namespace SignJwtGatewayContract {
  export type Input = {
    payload: JwtPayloadModel
    secret: string
    expires_in: string
  }
  export type Output = string
}
