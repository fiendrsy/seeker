import { compare } from "bcryptjs";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { UserProfile } from "../users/interface";
import { ACCESS_DENIED } from "../app.constants";
import {
  EMAIL_IS_ALREADY_REGISTERED,
  LOGIN_IS_ALREADY_REGISTERED,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from "./constants";

@Injectable()
export class AuthValidationService {
  constructor(private usersService: UsersService) {}

  public async validateCandidate(login: string, email: string): Promise<void> {
    const oldLogin = await this.usersService.findByLogin(login);
    const oldEmail = await this.usersService.findByEmail(email);
    if (oldLogin) {
      throw new HttpException(LOGIN_IS_ALREADY_REGISTERED, HttpStatus.CONFLICT);
    }
    if (oldEmail) {
      throw new HttpException(EMAIL_IS_ALREADY_REGISTERED, HttpStatus.CONFLICT);
    }
  }

  public async validateTokens(refreshToken: string, refreshTokenHash: string): Promise<void> {
    const matchingTokens = await compare(refreshToken, refreshTokenHash);
    if (!matchingTokens) {
      throw new HttpException(ACCESS_DENIED, HttpStatus.FORBIDDEN);
    }
  }

  public async validateUser(login: string, password: string, email?: string): Promise<UserProfile> {
    const user = await this.usersService.findByLogin(login);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.validatePassword(password, user.passwordHash);
    await this.validateEmail(email);
    const userProfile = await this.usersService.profile(login);
    return userProfile;
  }

  public async validatePassword(password: string, passwordHash: string): Promise<void> {
    const matchingPassword = await compare(password, passwordHash);
    if (!matchingPassword) {
      throw new HttpException(WRONG_PASSWORD, HttpStatus.UNAUTHORIZED);
    }
  }

  public async validateEmail(email: string): Promise<void> {
    if (!email) return;
    const emailIsUsed = await this.usersService.findByEmail(email);
    if (emailIsUsed) {
      throw new HttpException(EMAIL_IS_ALREADY_REGISTERED, HttpStatus.CONFLICT);
    }
  }
}
