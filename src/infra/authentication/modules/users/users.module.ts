import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import {
  RegisterUserController,
  GetUserController,
  UpdateUserAvatarController,
  SendForgotPasswordMailController,
} from '@/application/authentication/controllers'
import {
  RegisterUserUseCase,
  GetUserUseCase,
  UpdateUserAvatarUseCase,
  SendForgotPasswordMailUseCase,
} from '@/domain/authentication/use-cases'
import {
  UsersRepository,
  UserTokensRepository,
} from '@/infra/authentication/repositories'
import { PrismaService } from '@/infra/common/database'
import { GenerateHashGateway } from '@/infra/authentication/gateways'
import { AuthMiddlewareCreator } from '@/application/authentication/middlewares'
import { SessionsModule } from '@/infra/authentication/modules/sessions'
import {
  AddHoursDateGateway,
  EtherealSendMailGateway,
  S3SaveStorageGateway,
} from '@/infra/common/gateways'

@Module({
  controllers: [
    RegisterUserController,
    GetUserController,
    UpdateUserAvatarController,
    SendForgotPasswordMailController,
  ],
  providers: [
    RegisterUserUseCase,
    GetUserUseCase,
    UpdateUserAvatarUseCase,
    UsersRepository,
    PrismaService,
    GenerateHashGateway,
    S3SaveStorageGateway,
    SendForgotPasswordMailUseCase,
    UserTokensRepository,
    AddHoursDateGateway,
    EtherealSendMailGateway,
  ],
  imports: [SessionsModule],
  exports: [UsersRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        AuthMiddlewareCreator({
          roles: ['client'],
        }),
      )
      .forRoutes(
        { path: 'users/me', method: RequestMethod.GET },
        { path: 'users/avatar', method: RequestMethod.POST },
      )
  }
}
