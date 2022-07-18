import { Request, Response } from "express";
import { CreateWifi } from "../repositories/wifiRepository.js";

import * as wifiService from "../services/wifiService.js";


export async function insert (req: Request, res: Response) {
  const user = res.locals.user;
  const wifi: CreateWifi = {
    ... req.body, userId: user.id
  };
  await wifiService.insert(wifi);
  res.sendStatus(201);
}

export async function getById (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const wifiId = parseInt(req.params.id);
  const wifi = await wifiService.getById(wifiId, userId);
  res.send(wifi);
}

export async function getByUserId (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const wifis = await wifiService.getByUserId(userId);
  res.send(wifis);
}

export async function remove (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const wifiId = parseInt(req.params.id);
  await wifiService.remove(wifiId, userId);
  res.sendStatus(200);
}