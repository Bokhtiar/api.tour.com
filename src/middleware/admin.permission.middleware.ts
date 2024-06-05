import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

/* admin permission handle */
export const adminPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = await req.headers.authorization;
    if (!token) {
      return res.status(404).json({
        status: false,
        message: "Authorization token not found.",
      });
    }

    // decode token
    const splitToken = await token.split(" ")[1];
    const decode = await jwt.verify(splitToken, process.env.JWT_SECRET);

    if (decode.role !== "admin") {
      return res.status(410).json({
        status: false,
        errors: { message: "You have no permission to access." },
      });
    }

    const user = {
      id: decode.id,
      name: decode.name,
      role: decode.role,
    };
    req.user = user;
    next();
    return;
  } catch (error: any) {
    if (error) {
      res.status(401).json({
        status: false,
        errors: [
          {
            field: "Token",
            message: "Token expaired.",
          },
        ],
      });
    }
  }
};
