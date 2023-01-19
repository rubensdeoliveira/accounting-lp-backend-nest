export interface AddDaysDateGatewayContract {
  add: (
    input: AddDaysDateGatewayContract.Input,
  ) => Promise<AddDaysDateGatewayContract.Output>
}

export namespace AddDaysDateGatewayContract {
  export type Input = { date: Date; days: number }
  export type Output = Date
}
