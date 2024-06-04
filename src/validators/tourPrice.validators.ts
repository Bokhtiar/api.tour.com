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
      message: "Tour price title is required.",
    },
    price: {
      type: "string",
      required: true,
      message: "Price is required.",
    },
    tour: {
      type: "string",
      required: true,
      message: "Tour is required.",
    },
    persone: {
      type: "string",
      required: true,
      message: "persone is required.",
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

export const adminTourPriceValidators = {
  createUpdate,
};
