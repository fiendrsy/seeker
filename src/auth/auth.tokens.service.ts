import { Model } from "mongoose";
import { genSalt, hash } from "bcryptjs";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "../users/schemas";
import { JwtPayload, Tokens } from "./interface";

@Injectable()
export class AuthTokensService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  public async generateTokens(_id: string, login: string, roles: string[]): Promise<Tokens> {
    const payload: JwtPayload = { _id, login, roles };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY_ACCESS,
      expiresIn: process.env.EXPIRESIN_ACCESS,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY_REFRESH,
      expiresIn: process.env.EXPIRESIN_REFRESH,
    });
    return {
      refreshToken,
      accessToken,
    };
  }

  public async updateRefreshTokenHash(_id: string, refreshToken: string): Promise<void> {
    const hash = await this.hashingData(refreshToken);
    await this.userModel.findByIdAndUpdate(_id, { refreshTokenHash: hash });
  }

  private async hashingData(data: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(data, salt);
  }
}
