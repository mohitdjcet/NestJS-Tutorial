import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const exceptionRes = exception.getResponse()
    const message = typeof exceptionRes === 'string'? exceptionRes: exceptionRes['message']
    
    response.status(status).json({
      success: false,
      statusCode: status,
      message:message,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
