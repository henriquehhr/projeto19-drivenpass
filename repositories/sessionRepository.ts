import { Session } from "@prisma/client";
import prisma from "../database/database.js";

export type CreateSession = Omit<Session, "id">;

export async function insert(session: CreateSession) {
  await prisma.session.create({data: session});
}

export async function findByToken(token: string) {
  await prisma.session.findUnique({where: {token}});
}