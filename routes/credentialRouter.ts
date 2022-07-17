import { Router } from "express";
import { getById, insert } from "../controllers/credentialController.js";
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


credentialRouter.delete("/credentials", authenticateUser);

export default credentialRouter;