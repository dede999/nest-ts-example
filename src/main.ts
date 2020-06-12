import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestJS sandbox')
    .setDescription('Learing from some recipes seen on docs')
    .build();
  
  const docs = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, docs);

  await app.listen(3000);
}
bootstrap();
