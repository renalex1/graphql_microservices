import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Uniq id of user' })
  id: string;

  @Field({ description: 'Email of user' })
  email: string;

  @Field({ description: 'Password of user' })
  password: string;
}
