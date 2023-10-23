import {
  Resolver,
  // Query,
  // Mutation,
  // Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
// import { CreatePostInput } from './dto/create-post.input';
import { User } from './entities/user.entity';
// import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField(() => [Post])
  posts(@Parent() user: User): Post[] {
    return this.postsService.forAuthor(user.id);
  }
}
