import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { config } from 'aws-sdk'

import { AppModule } from './app.module'

async function bootstrap() {
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
    region: process.env.AWS_REGION,
  })
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.enableCors()
  await app.listen(3333)
}
bootstrap()
