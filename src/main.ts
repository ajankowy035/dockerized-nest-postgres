import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //set the X-Content-Type-Options header to nosniff
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  //set the Content-Security-Policy header - XSS
  app.use(helmet.contentSecurityPolicy());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
