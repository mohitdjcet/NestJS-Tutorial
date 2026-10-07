import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService:ConfigService
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  getAppConfig(){
    const environment = this.configService.get<string>('NODE_ENV','developemnt');
    const port = this.configService.get<string>('PORT');
    const database = this.configService.get<string>('DB_DATABASE');

    console.log("PORT:",port);
    console.log("DB:",database);
    console.log("Env:",environment);

    return{
      environment,
      port,
      database
    }
  }
}
