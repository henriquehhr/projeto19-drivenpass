import { SafeNote } from "@prisma/client";
import prisma from "../database/database.js";

export type CreateSafeNote = Omit<SafeNote, "id">;

export async function findByTitle(title: string) {
  const safeNote = await prisma.safeNote.findFirst({where: {title}});
  return safeNote;
}

export async function insert(safeNote: CreateSafeNote) {
  await prisma.safeNote.create({data: safeNote});
}

export async function getById(safeNoteId: number) {
  const safeNote = await prisma.safeNote.findUnique({where: {id: safeNoteId}});
  return safeNote;
}

export async function getByUserId(userId: number) {
  const safeNotes = await prisma.safeNote.findMany({where: {userId}});
  return safeNotes;
}

export async function remove(safeNoteId: number) {
  await prisma.safeNote.delete({where: {id: safeNoteId}});
}