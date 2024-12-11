import { Router, Request, Response } from "express";
import { prisma } from "../database";
import { Errors } from "../helper";
import { PostController } from "../controllers/post";

const router = Router();
const postController = new PostController(prisma);

// Get posts "/posts?sort=recent"
router.get("/", async (req: Request, res: Response) => {
  try {
    const { sort } = req.query;
    if (sort !== "recent") {
      return res
        .status(400)
        .json({ error: Errors.ClientError, data: undefined, success: false });
    }

    // Get the posts
    const posts = await postController.getPostsWithVotes();
    return res.json({ error: undefined, data: { posts }, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

module.exports = router;
