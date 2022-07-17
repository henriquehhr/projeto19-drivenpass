import { Router } from "express";
import safeNoteRouter from "../routes/safeNoteRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(safeNoteRouter);

export default router;