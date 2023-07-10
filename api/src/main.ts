import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { defaultPort } from './settings/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.WEB_APP_URL,
  });

  const config = new DocumentBuilder()
    .setTitle('EasyMarket API')
    .setDescription('The EasyMarket API documentation')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'EasyMarket API Docs',
  });

  await app.listen(process.env.PORT || defaultPort);
}
bootstrap();
