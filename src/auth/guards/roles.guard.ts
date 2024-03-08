import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from 'auth/constants/roles.enum';
import { TokenPayload } from 'auth/constants/token-payload.interface';
import { ROLE_KEY as ROLE_KEY } from 'constants/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const graphQLContext = GqlExecutionContext.create(context);
    const { req: request } = graphQLContext.getContext();

    const requiredRole = this.reflector.getAllAndOverride<Roles>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      throw new Error('A role should be defined for this operation');
    }

    return (request.user as TokenPayload).role === requiredRole;
  }
}
