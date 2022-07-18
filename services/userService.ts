import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import * as userRepository from "../repositories/userRepository.js";
import {CreateUser, LoginUser} from "../repositories/userRepository.js";

export async function insert(user: CreateUser) {
  const userSameEmail = await userRepository.findByEmail(user.email);
  if(userSameEmail)
    throw {type: "Conflict", message: "Email already choosen"};
  const passwordHash = bcrypt.hashSync(user.password, 11);
  user.password = passwordHash;
  await userRepository.insert(user);
}

export async function sigin (user: LoginUser) {
  const userData = await userRepository.findByEmail(user.email);
  if (userData && bcrypt.compareSync(userData.password, user.password)) {
    const secretKey = process.env.JWT_SECRET;
    delete userData.password;
    const token = jwt.sign({ userData }, secretKey);
    return token;
  }
  throw {type: "Unauthorized", message: "Wrong credentials"};
}