import joi from "joi";
import { CreateCredential } from "../repositories/credentialRepository";

export const newCredentialSchema = joi.object<CreateCredential>({
    
});