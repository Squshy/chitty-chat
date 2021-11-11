import { Resolver, Query } from "type-graphql";
import { Post } from "../entities/Post";

@Resolver(Post)
export class PostResolver {
  // return array of posts
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }
}
