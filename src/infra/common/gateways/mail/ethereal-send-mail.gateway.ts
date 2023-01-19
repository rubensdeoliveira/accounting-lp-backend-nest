import { Injectable } from '@nestjs/common'
import {
  Transporter,
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from 'nodemailer'
import handlebars from 'handlebars'
import { readFileSync } from 'fs'

import { SendMailGatewayContract } from '@/domain/common/contracts/gateways'

@Injectable()
export class EtherealSendMailGateway implements SendMailGatewayContract {
  private client: Transporter
  constructor() {
    createTestAccount()
      .then(account => {
        const transporter = createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })
        this.client = transporter
      })
      .catch(err => {
        console.error(err)
      })
  }

  async send({
    path,
    variables,
    subject,
    to,
  }: SendMailGatewayContract.Input): Promise<void> {
    const templateFileContent = readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)
    const message = await this.client.sendMail({
      to,
      from: `${process.env.EMAIL_NAME} ${process.env.EMAIL_ADDRESS}`,
      subject,
      html: templateHTML,
    })
    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', getTestMessageUrl(message))
  }
}
