import Cryptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

import { CreateWifi } from "../repositories/wifiRepository.js";
import * as wifiRepository from "../repositories/wifiRepository.js";

export async function insert(wifi: CreateWifi) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptedPassword = cryptr.encrypt(wifi.password);
  wifi.password = encryptedPassword;
  await wifiRepository.insert(wifi);
}

export async function getById(wifiId: number, userId: number) {
  const wifi = await wifiRepository.getById(wifiId);
  if(!wifi)
    throw {type: "NotFound", message: "Wifi ID not founded"}
  if(wifi.userId != userId)
    throw {type: "Forbidden", message: "Not your wifi"}
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const passwordDecrypted = cryptr.decrypt(wifi.password);
  wifi.password = passwordDecrypted;
  return wifi;
}

export async function getByUserId(userId: number) {
  const wifi = await wifiRepository.getByUserId(userId);
  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  wifi.forEach(wifi => {
    const passwordDecrypted = cryptr.decrypt(wifi.password);
    wifi.password = passwordDecrypted;
  });
  return wifi;
}

export async function remove(wifiId: number, userId: number) {
  const wifi = await wifiRepository.getById(wifiId);
  if(!wifi)
    throw {type: "Not Found", message: "Wifi ID not founded"};
  if(wifi.userId != userId)
    throw {type: "Forbidden", message: "Wifi don't belong to user"};
  await wifiRepository.remove(wifiId);
}