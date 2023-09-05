import { Model } from "mongoose";
import { genSalt, hash } from "bcryptjs";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "../users/schemas";
import { JwtPayload, Tokens } from "./interface";

@Injectable()
export class AuthTokensService {
  private readonly secret: string = process.env.SECRET_KEY_ACCESS;
  private readonly refreshSecret: string = process.env.SECRET_KEY_REFRESH;
  private readonly seconds: number = 600;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  public async generateTokens(sub: string, login: string, roles: string[]): Promise<Tokens> {
    const payload: JwtPayload = { sub, login, roles };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.secret,
      expiresIn: this.seconds,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.refreshSecret,
      expiresIn: (this.seconds) * 100,
    });
    return {
      refreshToken,
      accessToken,
    };
  }

  public async updateRefreshTokenHash(sub: string, refreshToken: string): Promise<void> {
    const hash = await this.hashingData(refreshToken);
    await this.userModel.findByIdAndUpdate(sub, { refreshTokenHash: hash });
  }

  private async hashingData(data: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(data, salt);
  }
}
