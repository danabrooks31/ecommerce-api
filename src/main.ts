import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enables global validation so DTOs work
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  //build swagger meta data
  const config=new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('Products, Categories, Users, Auth')
    .setVersion('1.0')
    //JWT scheme so the Swagger UI gets an Authorize lock button
    .addBearerAuth()
    .build()
  //generate an jason doc that scans controllers/dtos/decorators
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // open at /api
    
  await app.listen(process.env.PORT ?? 3000);
  console.log(await app.getUrl());
}
bootstrap();
