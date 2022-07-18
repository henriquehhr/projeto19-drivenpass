import { Router } from "express";
import safeNoteRouter from "../routes/safeNoteRouter.js";
import cardRouter from "./cardRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(safeNoteRouter);
router.use(cardRouter);

export default router;