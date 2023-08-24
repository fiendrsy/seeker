import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { User } from "../decorators";
import { JwtAccessTokenGuard, JwtRefreshTokenGuard } from "../guards";
import { PasswordChangeValidationPipe } from "../pipes";
import { SignInDto, SignUpDto, ChangeEmailDto, ChangePasswordDto } from "./dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-up")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async signUp(@Body() dto: SignUpDto) {
    return await this.authService.signUp(dto);
  }

  @Post("sign-in")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post("logout")
  @HttpCode(200)
  async logout(@User("_id") userId: string) {
    return await this.authService.logout(userId);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post("refresh")
  @HttpCode(200)
  async refreshToken(@User("_id") userId: string, @User("refreshToken") token: string) {
    return await this.authService.refreshToken(userId, token);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch("change-password")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async changePassword(
    @User("login") login: string,
    @Body(PasswordChangeValidationPipe) dto: ChangePasswordDto
  ) {
    return this.authService.changePassword(login, dto);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch("change-email")
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async changeEmail(@Body() dto: ChangeEmailDto, @User("login") login: string) {
    return await this.authService.changeEmail(login, dto);
  }
}
