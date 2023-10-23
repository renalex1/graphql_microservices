import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Uniq id of user' })
  id: string;

  @Field({ description: 'Email of user' })
  email: string;

  @Field({ description: 'Password of user' })
  password: string;
}
