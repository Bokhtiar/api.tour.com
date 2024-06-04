import { Router } from "express";
import * as CommentController from "../../controllers/admin/comment.controller";
import { adminCommentValidators } from "../../validators/comment.validators";
export const adminCommentRouter: Router = Router();

adminCommentRouter.get("/", CommentController.index);
adminCommentRouter.post(
  "/",
  adminCommentValidators.createUpdate,
  CommentController.store
);
adminCommentRouter.get("/:id", CommentController.show);
adminCommentRouter.put(
  "/:id",
  adminCommentValidators.createUpdate,
  CommentController.update
);
adminCommentRouter.delete("/:id", CommentController.destroy);
