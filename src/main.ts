import * as compression from 'compression';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(compression())

  const options = new DocumentBuilder()
    .setTitle('NestJS sandbox')
    .setDescription('Learning from some recipes seen on docs')
    .build();
  
  const docs = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, docs);

  await app.listen(3000);
}
bootstrap();
