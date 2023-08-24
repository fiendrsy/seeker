import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { SignUpDto } from "../auth/dto";
import { User, UserDocument } from "./schemas";
import { UserProfile } from "./interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  public async profile(login: string): Promise<UserProfile> {
    const { email, roles, _id, image } = await this.userModel.findOne({ login }).exec();
    return {
      login,
      email,
      roles,
      _id,
      image,
    };
  }

  public async updateProfile(userId: string, login: string, data: object): Promise<UserProfile> {
    await this.userModel.findByIdAndUpdate(userId, data).exec();
    return await this.profile(login);
  }

  public async findByLogin(login: string): Promise<UserDocument> {
    return await this.userModel.findOne({ login }).exec();
  }

  public async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  public async createUser(dto: SignUpDto, hash: string) {
    const createdUser = await this.userModel.create({
      ...dto,
      passwordHash: hash,
      roles: ["user"],
    });
    const userProfile = await this.profile(createdUser.login);
    return userProfile;
  }
}
