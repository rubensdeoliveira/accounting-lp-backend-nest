import { VerifyJwtGateway } from '@/infra/authentication/gateways'
import { UsersRepository } from '@/infra/authentication/repositories'
import {
  Injectable,
  mixin,
  NestMiddleware,
  Type,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

type AuthMiddlewareCreatorProps = {
  roles: string[]
}

export function AuthMiddlewareCreator({
  roles,
}: AuthMiddlewareCreatorProps): Type<NestMiddleware> {
  @Injectable()
  class AuthMiddleware implements NestMiddleware {
    constructor(
      private readonly usersRepository: UsersRepository,
      private readonly verifyJwtGateway: VerifyJwtGateway,
    ) {}

    async use(
      req: Request & { user_id: string },
      _: Response,
      next: NextFunction,
    ) {
      const authHeader = req.headers.authorization
      if (!authHeader) {
        throw new UnauthorizedException('Token missing')
      }
      const [, token] = authHeader.split(' ')
      try {
        const payload = this.verifyJwtGateway.verify({
          token,
          secret: process.env.JWT_TOKEN_SECRET,
        })
        const user = await this.usersRepository.findById(payload.id)
        if (user && roles.includes(user.role)) {
          req.user_id = user.id
          return next()
        } else {
          throw new UnauthorizedException(
            'You dont have permissions to access this route',
          )
        }
      } catch {
        throw new UnauthorizedException('Token invalid')
      }
    }
  }
  return mixin(AuthMiddleware)
}
