import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { join } from 'path';

const fileName = process.env.NODE_ENV ? process.env.NODE_ENV : '';
const envFilePath = join(__dirname, `../../../${fileName}.env`);
const ENV = config({ path: envFilePath }).parsed;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(ENV.GATEWAY_PORT);

  console.log(`
  🚀 GraphQL Microservice - Gateway - , launched at http://${ENV.GATEWAY_HOST}:${ENV.GATEWAY_PORT}/graphql`);
}

bootstrap();
