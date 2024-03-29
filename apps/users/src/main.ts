import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { config } from 'dotenv';
import { join } from 'path';

const fileName = process.env.NODE_ENV ? process.env.NODE_ENV : '';
const envFilePath = join(__dirname, `../../../${fileName}.env`);
const ENV = config({ path: envFilePath }).parsed;

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  await app.listen(ENV.USERS_PORT);

  console.log(`
  🚀 GraphQL Microservice - Users - , launched at http://${ENV.USERS_HOST}:${ENV.USERS_PORT}/graphql`);
}
bootstrap();
