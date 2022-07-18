import { Request, Response } from "express";
import { CreateCard } from "../repositories/cardRepository.js";

import * as cardService from "../services/cardService.js";


export async function insert (req: Request, res: Response) {
  const user = res.locals.user;
  const card: CreateCard = {
    ... req.body, userId: user.id
  };
  await cardService.insert(card);
  res.sendStatus(201);
}

export async function getById (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const cardId = parseInt(req.params.id);
  const card = await cardService.getById(cardId, userId);
  res.send(card);
}

export async function getByUserId (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const cards = await cardService.getByUserId(userId);
  res.send(cards);
}

export async function remove (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const cardId = parseInt(req.params.id);
  await cardService.remove(cardId, userId);
  res.sendStatus(200);
}