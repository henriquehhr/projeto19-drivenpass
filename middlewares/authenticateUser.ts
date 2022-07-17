import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {

    const validateTokenFormat = req.headers.authorization.slice(0, 7);
    if (validateTokenFormat != "Bearer ") {
        return res.sendStatus(422);
    }
    const jwtKey = process.env.JWT_KEY;
    const token = req.headers.authorization.slice(7);
    if (jwt.verify(token, jwtKey)){
      res.locals.user = jwt.decode(token);
      next();
    }
    else throw {type: "Unauthorized", message: "Wrong credentials"};
}