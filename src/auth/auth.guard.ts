import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authenticate = request.headers['x-authenticated'];

    if(authenticate !== 'true'){
      throw new UnauthorizedException(
        "Please Login First"
      )
    }
    return true;
  }
}
