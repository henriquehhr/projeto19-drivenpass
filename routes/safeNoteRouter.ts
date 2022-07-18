import { Router } from "express";

import { getById, getByUserId, insert, remove } from "../controllers/safeNoteController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { newSafeNoteSchema } from "../schemas/newSafeNoteSchema.js"

const safeNoteRouter = Router();

safeNoteRouter.post(
  "/safenotes",
  schemaValidator(newSafeNoteSchema),
  authenticateUser,
  insert
);
safeNoteRouter.get(
  "/safenotes/:id",
  authenticateUser,
  getById
);

safeNoteRouter.get(
  "/safenotes",
  authenticateUser,
  getByUserId
);

safeNoteRouter.delete("/credentials/:id", authenticateUser, remove);

export default safeNoteRouter;