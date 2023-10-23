import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { authContext } from './auth.context';
import { config } from 'dotenv';
import { join } from 'path';

const fileName = process.env.NODE_ENV ? process.env.NODE_ENV : '';
const envFilePath = join(__dirname, `../../../${fileName}.env`);
const ENV = config({ path: envFilePath }).parsed;

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // cors: true,
        context: authContext,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: ENV.USERS_NAME,
              url: `${ENV.USERS_PROTOCOL}://${ENV.USERS_HOST}:${ENV.USERS_PORT}/graphql`,
            },
            {
              name: ENV.POSTS_NAME,
              url: `${ENV.POSTS_PROTOCOL}://${ENV.POSTS_HOST}:${ENV.POSTS_PORT}/graphql`,
            },
          ],
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'user',
                context.user ? JSON.stringify(context.user) : null,
              );
            },
          });
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
