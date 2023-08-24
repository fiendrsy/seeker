import { IsString, Matches } from "class-validator";
import { VALID_PASSWORD, WRONG_PASSWORD_DTO } from "../constants";

export class ChangePasswordDto {
  @IsString()
  password: string;

  @Matches(VALID_PASSWORD, { message: WRONG_PASSWORD_DTO })
  @IsString()
  newPassword: string;

  @Matches(VALID_PASSWORD, { message: WRONG_PASSWORD_DTO })
  @IsString()
  verifiedNewPassword: string;
}
