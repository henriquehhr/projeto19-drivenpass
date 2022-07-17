import { Router } from "express";

import { getById, getByUserId, insert } from "../controllers/credentialController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { newCredentialSchema } from "../schemas/newCredentialSchema.js"

const credentialRouter = Router();

credentialRouter.post(
  "/credentials",
  schemaValidator(newCredentialSchema),
  authenticateUser,
  insert
);
credentialRouter.get(
  "/credentials/:id",
  authenticateUser,
  getById
);

credentialRouter.get(
  "/credentials/",
  authenticateUser,
  getByUserId
);

credentialRouter.delete("/credentials", authenticateUser);

export default credentialRouter;