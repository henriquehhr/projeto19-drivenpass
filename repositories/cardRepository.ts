import { Card } from "@prisma/client";
import prisma from "../database/database.js";

export type CreateCard = Omit<Card, "id">;

export async function findByTitle(title: string) {
  const card = await prisma.card.findFirst({where: {title}});
  return card;
}

export async function insert(card: CreateCard) {
  await prisma.card.create({data: card});
}

export async function getById(cardId: number) {
  const card = await prisma.card.findUnique({where: {id: cardId}});
  return card;
}

export async function getByUserId(userId: number) {
  const cards = await prisma.card.findMany({where: {userId}});
  return cards;
}

export async function remove(cardId: number) {
  await prisma.card.delete({where: {id: cardId}});
}