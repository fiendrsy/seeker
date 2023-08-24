import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthTokensService } from "./auth.tokens.service";
import { AuthValidationService } from "./auth.validation.service";

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AuthTokensService, AuthValidationService],
  exports: [AuthService],
})
export class AuthModule {}
