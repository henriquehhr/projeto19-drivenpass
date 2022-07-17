import { Credential } from "@prisma/client";
import prisma from "../database/database";

export type CreateCredential = Omit<Credential, "id">;

export async function findByTitle(title: string) {
  const credential = await prisma.credential.findUnique({where: {title}});
  return credential;
}

export async function insert(credential: CreateCredential) {
  await prisma.credential.create({data: credential});
}