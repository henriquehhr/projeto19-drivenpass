import Cryptr from "cryptr";

import { CreateCredential } from "../repositories/credentialRepository.js";
import * as credentialRepository from "../repositories/credentialRepository.js";

export async function insert(credential: CreateCredential) {
  const credentialSameTitle = await credentialRepository.findByTitle(credential.title);
  if(credentialSameTitle)
    throw {type: "Conflict", message: "Title already choosen"};
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptedPassword = cryptr.encrypt(credential.password);
  credential.password = encryptedPassword;
  await credentialRepository.insert(credential);
}

export async function getById(credencialId: number, userId: number) {
  const credential = await credentialRepository.getById(credencialId);
  if(credential.userId != userId)
    throw {type: "Forbidden", message: "Not your credential"}
  return credential;
}