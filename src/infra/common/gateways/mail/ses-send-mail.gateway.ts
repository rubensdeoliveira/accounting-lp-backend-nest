import { Injectable } from '@nestjs/common'
import nodemailer, { Transporter } from 'nodemailer'
import { SES } from 'aws-sdk'

import { SendMailGatewayContract } from '@/domain/common/contracts/gateways'

@Injectable()
export class SesSendMailGateway implements SendMailGatewayContract {
  private readonly client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    })
  }

  async send({
    path,
    variables,
    subject,
    to,
  }: SendMailGatewayContract.Input): Promise<void> {
    // const message = await this.client.sendMail({
    //   to,
    // from: `${process.env.EMAIL_NAME} ${process.env.EMAIL_ADDRESS}`
    //   subject,
    //   text: body,
    //   html: body,
    // })
    // console.log('Message sent: %s', message.messageId)
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
