import { Model } from "mongoose";
import { genSalt, hash } from "bcryptjs";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User, UserDocument } from "../users/schemas";
import { UsersService } from "../users/users.service";
import { UserProfile } from "../users/interface";
import { AuthValidationService } from "./auth-validation.service";
import { AuthTokensService } from "./auth-tokens.service";
import { Tokens } from "./interface";
import { ACCESS_DENIED } from "../app.constants";
import { ChangeEmailDto, SignUpDto, ChangePasswordDto, SignInDto } from "./dto";
import { USER_LOGOUT } from "./constants";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private usersService: UsersService,
    private authTokensService: AuthTokensService,
    private authValidationService: AuthValidationService
  ) {}

  public async signUp(dto: SignUpDto): Promise<UserProfile> {
    await this.authValidationService.validateCandidate(dto.login, dto.email);
    const hash = await this.hashingData(dto.password);
    return await this.usersService.createUser(dto, hash);
  }

  public async signIn(dto: SignInDto): Promise<UserProfile & Tokens> {
    const user = await this.authValidationService.validateUser(dto.login, dto.password);
    const tokens = await this.authTokensService.generateTokens(user._id, user.login, user.roles);
    await this.authTokensService.updateRefreshTokenHash(user._id, tokens.refreshToken);
    return {
      ...user,
      ...tokens,
    };
  }

  public async logout(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash: null });
  }

  public async refreshToken(userId: string, token: string): Promise<Tokens> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new HttpException(ACCESS_DENIED, HttpStatus.FORBIDDEN);
    }
    if (!user.refreshTokenHash) {
      throw new HttpException(USER_LOGOUT, HttpStatus.UNAUTHORIZED);
    }
    await this.authValidationService.validateTokens(token, user.refreshTokenHash);
    const tokens = this.authTokensService.generateTokens(user._id, user.login, user.roles);
    await this.authTokensService.updateRefreshTokenHash(user._id, user.refreshTokenHash);
    return tokens;
  }

  public async changeEmail(login: string, dto: ChangeEmailDto): Promise<UserProfile> {
    const user = await this.authValidationService.validateUser(login, dto.password, dto.newEmail);
    return await this.usersService.updateProfile(user._id, user.login, {
      email: dto.newEmail,
    });
  }

  public async changePassword(login: string, dto: ChangePasswordDto): Promise<UserProfile> {
    const user = await this.authValidationService.validateUser(login, dto.password);
    const hash = await this.hashingData(dto.newPassword);
    return await this.usersService.updateProfile(user._id, user.login, {
      passwordHash: hash,
    });
  }

  private async hashingData(data: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(data, salt);
  }
}
