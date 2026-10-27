import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Users API")
    .setDescription("Simple GET & Post API Docs")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("api-docs",app,document);
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
