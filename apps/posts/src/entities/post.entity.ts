import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Post {
  @Field(() => ID, { description: 'Uniq id of user' })
  id: string;

  @Field()
  body: string;

  @Field()
  authorId: string;

  @Field(() => [User])
  users?: User;
}
