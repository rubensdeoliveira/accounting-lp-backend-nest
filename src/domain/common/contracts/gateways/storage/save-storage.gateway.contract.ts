export interface SaveStorageGatewayContract {
  save: (
    input: SaveStorageGatewayContract.Input,
  ) => Promise<SaveStorageGatewayContract.Output>
}

export namespace SaveStorageGatewayContract {
  export type Input = { fileName: string; folder: string }
  export type Output = string
}
