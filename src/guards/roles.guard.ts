import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { JwtPayload } from "../auth/interface";
import { ROLES_KEY } from "../decorators";
import { ACCESS_DENIED } from "../app.constants";
import { getBearerToken } from "./helper";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!allowedRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = getBearerToken(request);
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY_ACCESS,
      });
      const currRoles: string[] = payload.roles;
      return allowedRoles.some((role) => currRoles.includes(role));
    } catch {
      throw new HttpException(ACCESS_DENIED, HttpStatus.FORBIDDEN);
    }
  }
}
