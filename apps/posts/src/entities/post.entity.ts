import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID, { description: 'Uniq id of user' })
  id: string;

  @Field()
  body: string;

  @Field()
  authorId: string;
}
