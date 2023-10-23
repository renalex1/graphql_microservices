import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field({ description: 'Uniq id of user' })
  id: string;

  @Field({ description: 'Post' })
  body: string;

  @Field({ description: 'User id ' })
  authorId: string;
}
