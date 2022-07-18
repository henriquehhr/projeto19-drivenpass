import { CreateSafeNote } from "../repositories/safeNoteRepository.js";
import * as safeNoteRepository from "../repositories/safeNoteRepository.js";

export async function insert(safeNote: CreateSafeNote) {
  const safeNoteSameTitle = await safeNoteRepository.findByTitle(safeNote.title);
  if(safeNoteSameTitle?.userId == safeNote.userId)
    throw {type: "Conflict", message: "Title already choosen"};
  await safeNoteRepository.insert(safeNote);
}

export async function getById(safeNoteId: number, userId: number) {
  const safeNote = await safeNoteRepository.getById(safeNoteId);
  if(!safeNote)
    throw {type: "NotFound", message: "Safe note ID not founded"}
  if(safeNote.userId != userId)
    throw {type: "Forbidden", message: "Not your safe note"}
  return safeNote;
}

export async function getByUserId(userId: number) {
  const safeNotes = await safeNoteRepository.getByUserId(userId);
  return safeNotes;
}

export async function remove(safeNoteId: number, userId: number) {
  const safeNote = await safeNoteRepository.getById(safeNoteId);
  if(!safeNote)
    throw {type: "Not Found", message: "Safe note ID not founded"};
  if(safeNote.userId != userId)
    throw {type: "Forbidden", message: "Safe note don't belong to user"};
  await safeNoteRepository.remove(safeNoteId);
}