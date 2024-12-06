import { PrismaClient } from "@prisma/client";
// import { UserSchema } from "./schema";

export class PostController {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getPostsWithVotes() {
    try {
      return await this.prisma.post.findMany({
        include: {
          votes: true, // Include associated votes for each post
          memberPostedBy: {
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          comments: true,
        },
        orderBy: {
          dateCreated: "desc", // Sorts by dateCreated in descending order
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
