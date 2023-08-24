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
	private readonly key: Record<string, string> = { secret: process.env.SECRET_KEY_ACCESS };

	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = getBearerToken(request);
		try {
			const payload: JwtPayload = await this.jwtService.verifyAsync(token, this.key);
			request.user = payload;
			return true;
		} catch (e) {
			throw new HttpException(ACCESS_DENIED, HttpStatus.UNAUTHORIZED);
		}
	}
}
