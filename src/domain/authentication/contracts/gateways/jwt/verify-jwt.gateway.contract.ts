import { JwtPayloadModel } from '@/domain/authentication/models'

export interface VerifyJwtGatewayContract {
  verify: (
    input: VerifyJwtGatewayContract.Input,
  ) => VerifyJwtGatewayContract.Output
}

export namespace VerifyJwtGatewayContract {
  export type Input = { token: string; secret: string }
  export type Output = JwtPayloadModel
}
