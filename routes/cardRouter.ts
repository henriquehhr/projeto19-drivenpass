import { Router } from "express";

import { getById, getByUserId, insert, remove } from "../controllers/cardController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { newCardSchema } from "../schemas/newCardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  schemaValidator(newCardSchema),
  authenticateUser,
  insert
);
cardRouter.get(
  "/cards/:id",
  authenticateUser,
  getById
);

cardRouter.get(
  "/cards",
  authenticateUser,
  getByUserId
);

cardRouter.delete("/cards/:id", authenticateUser, remove);

export default cardRouter;