import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'constants/is-public.decorator';
import { AccessTokenService } from 'token/access-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private accessTokenService: AccessTokenService,
    private reflector: Reflector,
  ) {}

  getTokenFromHeader(request: Request) {
    return request.headers.authorization;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const graphQLContext = GqlExecutionContext.create(context);
    const { req: request } = graphQLContext.getContext();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = this.getTokenFromHeader(request);

    if (!token) {
      return false;
    }

    try {
      const userPayload = await this.accessTokenService.verify(token);
      request.user = userPayload;

      return true;
    } catch (_) {
      return false;
    }
  }
}
