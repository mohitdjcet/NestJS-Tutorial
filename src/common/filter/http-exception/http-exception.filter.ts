import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const message = exception.getResponse();
    
    response.status(status).json({
      success: false,
      statusCode: status,
      message:message,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
