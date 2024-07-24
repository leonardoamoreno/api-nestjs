import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyHelmet } from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

async function bootstrap() {

  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    adapter);

  app.register(fastifyHelmet);

  app.register(require('@fastify/cors'), {
    origin: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization'
    ],
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });
  
  app.setGlobalPrefix('/api');
  
  const PORT = Number(process.env.PORT) || 8080;
  await app.listen(PORT);
  console.log(`APP IS RUNNING ON PORT ${await app.getUrl()}`);
}
bootstrap();
