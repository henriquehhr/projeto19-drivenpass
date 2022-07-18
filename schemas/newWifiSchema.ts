import joi from "joi";
import { CreateWifi } from "../repositories/wifiRepository.js";

export const newWifiSchema = joi.object<CreateWifi>({
    title: joi.string().required(),
    name: joi.string().required(),
    password: joi.string().required()
});