export interface SendMailGatewayContract {
  send: (input: SendMailGatewayContract.Input) => Promise<void>
}

export namespace SendMailGatewayContract {
  export type Input = {
    to: string
    subject: string
    variables: any
    path: string
  }
}
