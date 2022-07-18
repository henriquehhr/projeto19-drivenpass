import joi from "joi";
import { CreateSafeNote } from "../repositories/safeNoteRepository.js";

export const newSafeNoteSchema = joi.object<CreateSafeNote>({
    title: joi.string().max(50).required(),
    text: joi.string().max(1000).required()
});