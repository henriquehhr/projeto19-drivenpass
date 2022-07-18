import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

import { CreateCard } from "../repositories/cardRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function insert(card: CreateCard) {
  const cardSameTitle = await cardRepository.findByTitle(card.title);
  if(cardSameTitle)
    throw {type: "Conflict", message: "Title already choosen"};
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptedPassword = cryptr.encrypt(card.password);
  card.password = encryptedPassword;
  const encryptedCVV = cryptr.encrypt(card.CVV);
  card.CVV = encryptedCVV;
  await cardRepository.insert(card);
}

export async function getById(cardId: number, userId: number) {
  const card = await cardRepository.getById(cardId);
  if(!card)
    throw {type: "NotFound", message: "Card ID not founded"}
  if(card.userId != userId)
    throw {type: "Forbidden", message: "Not your card"}
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const passwordDecrypted = cryptr.decrypt(card.password);
  card.password = passwordDecrypted;
  const CVVDecrypted = cryptr.decrypt(card.CVV);
  card.CVV = CVVDecrypted;
  return card;
}

export async function getByUserId(userId: number) {
  const cards = await cardRepository.getByUserId(userId);
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  cards.forEach(card => {
    const passwordDecrypted = cryptr.decrypt(card.password);
    card.password = passwordDecrypted;
    const CVVDecrypted = cryptr.decrypt(card.CVV);
    card.CVV = CVVDecrypted;
  });
  return cards;
}

export async function remove(cardId: number, userId: number) {
  const card = await cardRepository.getById(cardId);
  if(!card)
    throw {type: "Not Found", message: "Card ID not founded"};
  if(card.userId != userId)
    throw {type: "Forbidden", message: "Card don't belong to user"};
  await cardRepository.remove(cardId);
}