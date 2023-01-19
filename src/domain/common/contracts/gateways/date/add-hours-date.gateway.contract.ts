export interface AddHoursDateGatewayContract {
  add: (
    input: AddHoursDateGatewayContract.Input,
  ) => Promise<AddHoursDateGatewayContract.Output>
}

export namespace AddHoursDateGatewayContract {
  export type Input = { date: Date; hours: number }
  export type Output = Date
}
