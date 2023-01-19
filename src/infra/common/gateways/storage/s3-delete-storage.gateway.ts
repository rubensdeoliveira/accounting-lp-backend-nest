import { Injectable } from '@nestjs/common'

import { DeleteStorageGatewayContract } from '@/domain/common/contracts/gateways'
import { S3 } from 'aws-sdk'

@Injectable()
export class S3DeleteStorageGateway implements DeleteStorageGatewayContract {
  async delete({
    fileName,
    folder,
  }: DeleteStorageGatewayContract.Input): Promise<void> {
    const s3 = new S3()

    await s3
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: fileName,
      })
      .promise()
  }
}
