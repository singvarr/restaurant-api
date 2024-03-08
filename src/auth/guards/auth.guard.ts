import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from 'auth/auth.service';
import { IS_PUBLIC_KEY } from 'constants/is-public.decorator';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  private getTokenFromHeader(request: Request) {
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

    const userPayload = await this.authService.verifyToken(token);

    if (!userPayload) {
      return false;
    }

    request.user = userPayload;

    return true;
  }
}
