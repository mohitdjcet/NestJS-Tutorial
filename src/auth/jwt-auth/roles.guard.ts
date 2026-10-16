import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';

type AuthenticatedRequest = {
    user?:{
        sub:number,
        email:string,
        role:string
    }
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector:Reflector,
  ){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
    )
    if(!requiredRoles || requiredRoles.length===0){
        return true
    }
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
    if(!user){
        throw new ForbiddenException(
            'You do not have permission'
        );
    }
    if(!requiredRoles.includes(user.role)){
        throw new ForbiddenException(
            'You do not have permission to access this resource'
        )
    }
    return true;
  }
}
