import { Post, Vote, Member, Comment } from "@prisma/client";

export interface PostWithVotes extends Post {
  votes: Vote[];
  memberPostedBy: Member & {
    user: {
      username: string;
    };
  };
  comments: Comment[];
}
