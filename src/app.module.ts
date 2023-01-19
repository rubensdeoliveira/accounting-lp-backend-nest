import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CommonModule } from '@/infra/common/modules'
import { AuthenticationModule } from '@/infra/authentication/modules'
import { BackofficeModule } from '@/infra/backoffice/modules'
import { ServeStaticModule } from '@nestjs/serve-static'
import { serverStaticConfig } from '@/application/common/config/server-static-config'

@Module({
  imports: [
    ServeStaticModule.forRoot(serverStaticConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthenticationModule,
    BackofficeModule,
    CommonModule,
  ],
})
export class AppModule {}
