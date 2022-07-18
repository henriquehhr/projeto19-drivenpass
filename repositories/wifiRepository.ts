import { Wifi } from "@prisma/client";
import prisma from "../database/database.js";

export type CreateWifi = Omit<Wifi, "id">;

export async function insert(wifi: CreateWifi) {
  await prisma.wifi.create({data: wifi});
}

export async function getById(wifiId: number) {
  const wifi = await prisma.wifi.findUnique({where: {id: wifiId}});
  return wifi;
}

export async function getByUserId(userId: number) {
  const wifis = await prisma.wifi.findMany({where: {userId}});
  return wifis;
}

export async function remove(wifiId: number) {
  await prisma.wifi.delete({where: {id: wifiId}});
}