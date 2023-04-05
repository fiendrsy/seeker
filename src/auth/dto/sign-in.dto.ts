import { IsString, Length, Matches } from "class-validator";
import {
	VALID_LOGIN,
	VALID_PASSWORD,
	WRONG_LOGIN_DTO,
	WRONG_PASSWORD_DTO,
} from "../constants";

export class SignInDto {
	@IsString()
	@Length(4, 12)
	@Matches(VALID_LOGIN, { message: WRONG_LOGIN_DTO })
	login: string;

	@IsString()
	@Length(8, 22)
	@Matches(VALID_PASSWORD, { message: WRONG_PASSWORD_DTO })
	password: string;
}
