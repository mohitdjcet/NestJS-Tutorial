import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log("Before Controller");
    // const startTime = Date.now();
    // console.log("Request Started");
    const request = context.switchToHttp().getRequest()
    console.log(request.method);
    console.log(request.url);
    return next.handle().pipe(
      map((data)=>{
        return{
          success:true,
          data,
        }
      })
    )
  }
}
