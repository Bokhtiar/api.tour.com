import Schema from "async-validator";
import { NextFunction, Request, Response } from "express";

/* Resource create & update validaor */
const createUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const descriptor = <any>{
    tour: {
      type: "string",
      required: true,
      message: "Tour is required.",
    },
    user: {
      type: "string",
      required: true,
      message: "User is required.",
    },
    comment: {
      type: "string",
      required: true,
      message: "comment is required.",
    },
  };

  /* Execute the validator */
  const validator = new Schema(descriptor);

  validator.validate({ ...req.body }, (errors: any) => {
    if (errors) {
      return res.status(422).json({
        status: false,
        errors,
      });
    }
    next();
  });
};

export const adminCommentValidators = {
  createUpdate,
};
