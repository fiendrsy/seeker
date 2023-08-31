import { Request } from "express";
import { HttpException, HttpStatus } from "@nestjs/common";
import { NOT_AUTHORIZED } from "../constants";

export function getBearerToken(req: Request): string {
  const [type, token] = req.headers.authorization?.split(" ") ?? [];
  if (type !== "Bearer" || !token) {
    throw new HttpException(NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
  return token;
}
