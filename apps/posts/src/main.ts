import { NestFactory } from '@nestjs/core';
import { PostsModule } from './posts.module';
import { config } from 'dotenv';
import { join } from 'path';

const fileName = process.env.NODE_ENV ? process.env.NODE_ENV : '';
const envFilePath = join(__dirname, `../../../${fileName}.env`);
const ENV = config({ path: envFilePath }).parsed;

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);
  await app.listen(ENV.POSTS_PORT);

  console.log(`
  🚀 GraphQL Microservice - Posts - , launched at http://${ENV.POSTS_HOST}:${ENV.POSTS_PORT}/graphql`);
}
bootstrap();
