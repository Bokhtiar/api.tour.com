import Schema from "async-validator";
import { NextFunction, Request, Response } from "express";


/* Resource create & update validaor */
const createUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  
  const descriptor = <any>{
    title: {
      type: "string",
      required: true,
      message: "Tour title is required.",
    },
    location: {
      type: "string",
      required: true,
      message: "Tour location is required.",
    },
    apply_date: {
      type: "string",
      required: true,
      message: "Apply date is required.",
    },
    end_apply_date: {
      type: "string",
      required: true,
      message: "Apply end date is required.",
    },
    days: {
      type: "string",
      required: true,
      message: "Day is required.",
    },
    max_people: {
      type: "string",
      required: true,
      message: "Max people is required.",
    },
    category: {
      type: "string",
      required: true,
      message: "category is required.",
    },
    descirption: {
      type: "string",
      required: true,
      message: "category is required.",
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

export const adminTourValidators = {
  createUpdate,
};
