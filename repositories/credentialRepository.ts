import { Credential } from "@prisma/client";
import prisma from "../database/database.js";

export type CreateCredential = Omit<Credential, "id">;

export async function findByTitle(title: string) {
  const credential = await prisma.credential.findFirst({where: {title}});
  return credential;
}

export async function insert(credential: CreateCredential) {
  await prisma.credential.create({data: credential});
}

export async function getById(credencialId: number) {
  const credential = await prisma.credential.findUnique({
    where: {id: credencialId},
    select: {
      title: true,
      username: true,
      url: true,
      password: true,
      userId: true
    }
  });
  return credential;
}

export async function getByUserId(userId: number) {
  const credentials = await prisma.credential.findMany({
    where: {userId},
    select: {
      title: true,
      username: true,
      url: true,
      password: true
    }
  });
  return credentials;
}

export async function remove(credencialId: number) {
  await prisma.credential.delete({where: {id: credencialId}});
}