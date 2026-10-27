import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet({
    contentSecurityPolicy:{
      directives:{
        defaultSrc:[" 'self' "],
        scriptSrc:[" 'self' "],
        styleSrc:[" 'self' "],
      }
    }
  }));
  app.enableCors({
    origin:'*',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders:["Content-Type","Authorization"]
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
