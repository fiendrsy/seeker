import { Request } from "express";
import { HttpException, HttpStatus } from "@nestjs/common";
import { NOT_AUTHORIZED } from "../constants";

export function getBearerToken(req: Request): string {
  const authHeader = req.headers.authorization;
  const bearer = authHeader?.split(" ")[0];
  const token = authHeader?.split(" ")[1];
  if (bearer !== "Bearer" || !token) {
    throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
  return token;
}
