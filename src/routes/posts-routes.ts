import { Router, Request, Response, NextFunction } from "express";
import { postsHandlers, error, ErrorType } from "../repositories/posts-repository";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middleware/inputValidation";
import { checkCredentials } from "../middleware/auth-middleware";

export const postsRouter = Router();

// Validatiion =====================================================================

const titleValidation = body("title")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Title should contain at least one character and up to 30");
const shortDescriptionValidation = body("shortDescription")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("ShortDescription should contain at least one character and up to 100");
const contentValidation = body("content")
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage("Content is missing,it should contain at least one character");
const bloggerIDValidation = body("bloggerId")
  .isInt({ gt: 0, lt: 100 })
  .withMessage("Invalid ID, it shoud be a number greater then 0,without symbols or letters");

// Routes ===========================================================================

postsRouter.get("/", (req: Request, res: Response) => {
  const posts = postsHandlers.getAllPosts();
  res.json(posts);
});

postsRouter.post(
  "/",
  checkCredentials,
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  bloggerIDValidation,

  inputValidationMiddleware,

  (req: Request, res: Response) => {
    const newPost = postsHandlers.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId);
    newPost ? res.status(201).json(newPost) : res.sendStatus(400);
  }
);

postsRouter.get("/:id", (req: Request, res: Response) => {
  const post = postsHandlers.getPost(+req.params.id);
  post ? res.json(post) : res.sendStatus(404);
});

postsRouter.put(
  "/:id",
  checkCredentials,
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  bloggerIDValidation,

  inputValidationMiddleware,

  (req: Request, res: Response) => {
    const isUpdated = postsHandlers.updatePost(
      +req.params.id,
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.bloggerId
    );
    if (isUpdated === 0) {
      res.sendStatus(400);
    } else {
      isUpdated ? res.status(204).json(isUpdated) : res.sendStatus(404);
    }
  }
);

postsRouter.delete("/:id", checkCredentials, (req: Request, res: Response) => {
  const isDeleted = postsHandlers.deletePost(+req.params.id);
  isDeleted ? res.sendStatus(204) : res.sendStatus(404);
});
