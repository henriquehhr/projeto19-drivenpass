import { Router } from "express";

import { getById, getByUserId, insert, remove } from "../controllers/wifiController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { newWifiSchema } from "../schemas/newWifiSchema.js";

const wifiRouter = Router();

wifiRouter.post(
  "/wifis",
  schemaValidator(newWifiSchema),
  authenticateUser,
  insert
);
wifiRouter.get(
  "/wifis/:id",
  authenticateUser,
  getById
);

wifiRouter.get(
  "/wifis",
  authenticateUser,
  getByUserId
);

wifiRouter.delete("/wifis/:id", authenticateUser, remove);

export default wifiRouter;