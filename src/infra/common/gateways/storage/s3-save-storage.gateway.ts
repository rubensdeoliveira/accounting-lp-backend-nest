import mime from 'mime'
import { resolve } from 'path'
import { S3 } from 'aws-sdk'
import { readFile, unlink } from 'node:fs/promises'
import { Injectable } from '@nestjs/common'

import { SaveStorageGatewayContract } from '@/domain/common/contracts/gateways'
import { filesFolder } from '@/application/common/constants'

@Injectable()
export class S3SaveStorageGateway implements SaveStorageGatewayContract {
  async save({
    fileName,
    folder,
  }: SaveStorageGatewayContract.Input): Promise<SaveStorageGatewayContract.Output> {
    const s3 = new S3()

    const originalName = resolve(filesFolder, fileName)
    const fileContent = await readFile(originalName)
    // const contentType = mime.getType('txt')
    // console.log(contentType)

    const file = await s3
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: fileName,
        ACL: 'public-read',
        Body: fileContent,
        // ContentType: contentType,
      })
      .promise()

    console.log(file)

    await unlink(originalName)

    return fileName
  }
}
