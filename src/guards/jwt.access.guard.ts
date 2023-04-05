import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../auth/interface";
import { ACCESS_DENIED } from "../app.constants";
import { getBearerToken } from "./helper";

@Injectable()
export class JwtAccessTokenGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = getBearerToken(request);
		try {
			const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
				secret: process.env.SECRET_KEY_ACCESS,
			});
			request.user = payload;
			return true;
		} catch {
			throw new HttpException(ACCESS_DENIED, HttpStatus.UNAUTHORIZED);
		}
	}
}
