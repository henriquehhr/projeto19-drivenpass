import joi from "joi";
import { CreateSafeNote } from "../repositories/safeNoteRepository";

export const newSafeNoteSchema = joi.object<CreateSafeNote>({
    title: joi.string().max(50).required(),
    text: joi.string().max(1000).required()
});