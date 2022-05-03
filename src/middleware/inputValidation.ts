import { Request, Response, NextFunction } from "express";
import { validationResult, body } from "express-validator";

const re = /^https:\/\/([\w-]+\.)+[\w-]+(\/[\w-]+)*\/?$/;
export const youtubeUrlValidation = body("youtubeUrl").trim().isLength({ min: 1, max: 100 }).matches(re).withMessage("Invalid youtubeUrl");


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    const myErrors = errors.array().map((e) => {
      return {
        message: e.msg,
        field: e.param,
      };
    });

    res.status(400).json({ errorsMessages: myErrors, resultCode: 1 });
  }
};
