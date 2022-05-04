import { Router, Request, Response } from "express";
import { bloggersRepository, error } from "../repositories/bloggers-repository";
import { body, param } from "express-validator";
import { inputValidationMiddleware,nameValidation,youtubeUrlValidation } from "../middleware/inputValidation";
import { checkCredentials } from "../middleware/auth-middleware";


export const bloggersRouter = Router();

const bloggerIDValidation = param("id")
  .isInt({ gt: 0 })
  .withMessage("Invalid ID, it shoud be a number greater then 0,without symbols or letters");



bloggersRouter.get("/",  (req: Request, res: Response) => {
  const bloggers = bloggersRepository.getAllBloggers();
  res.json(bloggers);
});

bloggersRouter.post(
  "/",
  checkCredentials,
  nameValidation,
  youtubeUrlValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const newBlogger = bloggersRepository.createBlogger(req.body.name, req.body.youtubeUrl);
    res.status(201).json(newBlogger);
  }
);

bloggersRouter.get("/:id", (req: Request, res: Response) => {
  const blogger = bloggersRepository.getBlogger(+req.params.id);
  blogger ? res.json(blogger) : res.sendStatus(404);
});

bloggersRouter.put(
  "/:id",
  checkCredentials,
  youtubeUrlValidation,
  nameValidation,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const updatedBlogger = bloggersRepository.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl);

    updatedBlogger ? res.sendStatus(204) : res.sendStatus(404);
  }
);

bloggersRouter.delete("/:id", checkCredentials, (req: Request, res: Response) => {
  const isDeleted = bloggersRepository.deleteBlogger(+req.params.id);
  isDeleted ? res.sendStatus(204) : res.sendStatus(404);
});
