import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { SendForgotPasswordMailUseCaseContract } from '@/domain/authentication/contracts/use-cases'
import {
  UsersRepository,
  UserTokensRepository,
} from '@/infra/authentication/repositories'
import {
  AddHoursDateGateway,
  EtherealSendMailGateway,
} from '@/infra/common/gateways'
import { resolve } from 'path'

@Injectable()
export class SendForgotPasswordMailUseCase
  implements SendForgotPasswordMailUseCaseContract
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userTokensRepository: UserTokensRepository,
    private readonly addHoursDateGateway: AddHoursDateGateway,
    private readonly sendMailGateway: EtherealSendMailGateway,
  ) {}

  async send({
    email,
  }: SendForgotPasswordMailUseCaseContract.Input): Promise<void> {
    const userByEmail = await this.usersRepository.findByEmail(email)
    if (!userByEmail) {
      throw new NotFoundException('User does not exists')
    }
    const token = uuidv4()
    const expires_date = await this.addHoursDateGateway.add({
      date: new Date(),
      hours: 3,
    })
    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'src',
      'application',
      'authentication',
      'views',
      'mail',
      'forgot-password.hbs',
    )
    const variables = {
      name: userByEmail.name,
      link: `${process.env.API_URL}${token}`,
      company: process.env.EMAIL_NAME,
    }
    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: userByEmail.id,
      expires_date,
    })
    await this.sendMailGateway.send({
      to: email,
      subject: 'Recuperaçāo de senha',
      variables,
      path: templatePath,
    })
  }
}
