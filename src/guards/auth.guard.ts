import { CanActivate, ExecutionContext, Session } from '@nestjs/common';

///returns if user has access to the route
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
