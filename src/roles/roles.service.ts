import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User, UserDocument } from "../users/schemas";
import { UsersService } from "../users/users.service";
import { UserProfile } from "../users/interface";
import { SetRolesDto } from "./dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private usersService: UsersService
  ) {}

  public async setRole(userId: string, dto: SetRolesDto): Promise<UserProfile> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException("USER NOT FOUND", HttpStatus.NOT_FOUND);
    }
    if (user.roles.includes(dto.role)) {
      throw new HttpException(`THE USER ALREADY HAS A ROLE ${dto.role}`, HttpStatus.BAD_REQUEST);
    }
    return await this.usersService.updateProfile(userId, user.login, {
      $push: { roles: dto.role },
    });
  }

  public async removeRole(userId: string, dto: SetRolesDto): Promise<UserProfile> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException("USER NOT FOUND", HttpStatus.NOT_FOUND);
    }
    if (!user.roles.includes(dto.role)) {
      throw new HttpException(`THE USER DOES NOT HAVE A ROLE ${dto.role}`, HttpStatus.BAD_REQUEST);
    }
    return await this.usersService.updateProfile(userId, user.login, {
      $pull: { roles: dto.role },
    });
  }

  public async findByRole(role: string): Promise<string[]> {
    const users = await this.userModel.find({ roles: { $all: [role] } }).exec();
    if (!users.length) {
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND);
    }
    const logins = [];
    for (let user of users) {
      logins.push(user.login);
    }
    return logins;
  }
}
