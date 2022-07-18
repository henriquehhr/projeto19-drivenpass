import joi from "joi";
import { CreateCard } from "../repositories/cardRepository.js";

export const newCardSchema = joi.object<CreateCard>({
    title: joi.string().required(),
    number: joi.string().required(),
    printedName: joi.string().required(),
    CVV: joi.string().required(),
    expirationDate: joi.string().regex(/^[0-9]{2}\/[0-9]{2}$/).required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().required(),
    type: joi.string().valid("credit", "debit", "credit/debit").required()
});