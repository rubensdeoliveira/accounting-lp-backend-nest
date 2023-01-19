export interface DeleteStorageGatewayContract {
  delete: (input: DeleteStorageGatewayContract.Input) => Promise<void>
}

export namespace DeleteStorageGatewayContract {
  export type Input = { fileName: string; folder: string }
}
