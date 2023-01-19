export interface GenerateHashGatewayContract {
  generate: (
    input: GenerateHashGatewayContract.Input,
  ) => Promise<GenerateHashGatewayContract.Output>
}

export namespace GenerateHashGatewayContract {
  export type Input = string
  export type Output = string
}
