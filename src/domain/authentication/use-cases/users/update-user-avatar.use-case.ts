import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { UpdateUserAvatarUseCaseContract } from '@/domain/authentication/contracts/use-cases'
import { UsersRepository } from '@/infra/authentication/repositories'
import { S3SaveStorageGateway } from '@/infra/common/gateways'

@Injectable()
export class UpdateUserAvatarUseCase
  implements UpdateUserAvatarUseCaseContract
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly s3SaveStorageGateway: S3SaveStorageGateway,
  ) {}

  async update({
    image,
    user_id,
  }: UpdateUserAvatarUseCaseContract.Input): Promise<void> {
    const userById = await this.usersRepository.findById(user_id)
    if (!userById) {
      throw new NotFoundException('User not found')
    }
    await this.s3SaveStorageGateway.save({
      fileName: image.filename,
      folder: 'avatar',
    })
  }
}
