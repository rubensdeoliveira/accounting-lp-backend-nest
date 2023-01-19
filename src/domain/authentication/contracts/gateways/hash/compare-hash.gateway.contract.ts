export interface CompareHashGatewayContract {
  compare: (
    input: CompareHashGatewayContract.Input,
  ) => Promise<CompareHashGatewayContract.Output>
}

export namespace CompareHashGatewayContract {
  export type Input = { hashedValue: string; value: string }
  export type Output = boolean
}
