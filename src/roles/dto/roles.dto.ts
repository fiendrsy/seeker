import { IsEnum, IsString } from "class-validator";

export enum AllowedRoles {
  ADMIN = "admin",
  USER = "user",
}

export class SetRolesDto {
  @IsString()
  @IsEnum(AllowedRoles)
  role: string;
}
