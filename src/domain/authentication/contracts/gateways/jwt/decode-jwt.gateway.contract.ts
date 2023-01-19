import { JwtPayloadModel } from '@/domain/authentication/models'

export interface DecodeJwtGatewayContract {
  decode: (
    input: DecodeJwtGatewayContract.Input,
  ) => DecodeJwtGatewayContract.Output
}

export namespace DecodeJwtGatewayContract {
  export type Input = string
  export type Output = JwtPayloadModel
}
