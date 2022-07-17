import { NextFunction, Request, Response } from "express";
import prisma from "../database/database.js";

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {

    const validateTokenFormat = req.headers.authorization.slice(0, 7);
    if (validateTokenFormat != "Bearer ") {
        return res.sendStatus(422);
    }
    const token = req.headers.authorization.slice(7);
    const session = await prisma.session.findUnique({where: {token}});
    if (!session) {
        return res.sendStatus(401);
    }
    const user = await prisma.user.findUnique({where:{ id: session.userId}})
    res.locals.user = user;
    next();
}