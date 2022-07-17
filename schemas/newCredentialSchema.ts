import joi from "joi";
import { CreateCredential } from "../repositories/credentialRepository";

export const newCredentialSchema = joi.object<CreateCredential>({
    title: joi.string().required(),
    url: joi.string().uri().required(),
    username: joi.string().required(),
    password: joi.string().required()
});