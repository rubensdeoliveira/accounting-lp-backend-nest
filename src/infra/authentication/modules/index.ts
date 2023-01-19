import { Module } from '@nestjs/common'

import { UsersModule } from '@/infra/authentication/modules/users'
import { SessionsModule } from '@/infra/authentication/modules/sessions'

@Module({
  imports: [UsersModule, SessionsModule],
})
export class AuthenticationModule {}
