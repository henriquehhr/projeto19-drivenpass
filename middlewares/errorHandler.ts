import { NextFunction, Request, Response } from "express";

export default function errorHandler(error, req: Request, res: Response, next: NextFunction) {
	if (error.type === "Unauthorized") return res.status(401).send(error.message);
  if (error.type === "Forbidden") return res.status(403).send(error.message);
  if (error.type === "Not Found") return res.status(404).send(error.message);
  if (error.type === "Conflict") return res.status(409).send(error.message);
  if (error.type === "Unprocessable entity") return res.status(422).send(error.message);

	return res.sendStatus(500);
}