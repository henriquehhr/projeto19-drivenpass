import { Request, Response } from "express";
import { CreateSafeNote } from "../repositories/safeNoteRepository.js";

import * as safeNoteService from "../services/safeNoteService.js";


export async function insert (req: Request, res: Response) {
  const user = res.locals.user;
  const safeNote: CreateSafeNote = {
    ... req.body, userId: user.id
  };
  await safeNoteService.insert(safeNote);
  res.sendStatus(201);
}

export async function getById (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const safeNoteId = parseInt(req.params.id);
  const safeNote = await safeNoteService.getById(safeNoteId, userId);
  res.send(safeNote);
}

export async function getByUserId (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const safeNotes = await safeNoteService.getByUserId(userId);
  res.send(safeNotes);
}

export async function remove (req: Request, res: Response) {
  const userId = parseInt(res.locals.user.id);
  const safeNoteId = parseInt(req.params.id);
  await safeNoteService.remove(safeNoteId, userId);
  res.sendStatus(200);
}