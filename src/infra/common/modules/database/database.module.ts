import { Module } from '@nestjs/common'

import { PrismaService } from '@/infra/common/database'

@Module({ providers: [PrismaService], exports: [PrismaService] })
export class DatabaseModule {}
