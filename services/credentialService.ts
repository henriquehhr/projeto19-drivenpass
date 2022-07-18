import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

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
  if(!credential)
    throw {type: "NotFound", message: "Credential ID not founded"}
  if(credential.userId != userId)
    throw {type: "Forbidden", message: "Not your credential"}
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const passwordDecrypted = cryptr.decrypt(credential.password);
  credential.password = passwordDecrypted;
  return credential;
}

export async function getByUserId(userId: number) {
  const credentials = await credentialRepository.getByUserId(userId);
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  credentials.forEach(credential => {
    const passwordDecrypted = cryptr.decrypt(credential.password);
    credential.password = passwordDecrypted;
  });
  return credentials;
}

export async function remove(credencialId: number, userId: number) {
  const credential = await credentialRepository.getById(credencialId);
  if(!credential)
    throw {type: "Not Found", message: "Credential ID not founded"};
  if(credential.userId != userId)
    throw {type: "Forbidden", message: "Credential don't belong to user"};
  await credentialRepository.remove(credencialId);
}