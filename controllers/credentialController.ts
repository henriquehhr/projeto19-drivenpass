import { Request, Response } from "express";
import { CreateCredential } from "../repositories/credentialRepository";

import * as credentialService from "../services/credentialService.js";


export async function insert (req: Request, res: Response) {
  const user = res.locals.user;
  const credential: CreateCredential = {
    ... req.body, userId: user.id
  };
  await credentialService.insert(credential);
  res.send(201);
}

export async function getById (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const credencialId = parseInt(req.params.id);
  const credential = await credentialService.getById(credencialId, userId);
  res.send(credential);
}

export async function getByUserId (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const credentials = await credentialService.getByUserId(userId);
  res.send(credentials);
}