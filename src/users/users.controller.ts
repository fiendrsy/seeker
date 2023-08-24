import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { User } from "../decorators";
import { JwtAccessTokenGuard } from "../guards";
import { UsersService } from "./users.service";

@UseGuards(JwtAccessTokenGuard)
@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("profile")
  @HttpCode(200)
  async profile(@User("login") login: string) {
    return await this.usersService.profile(login);
  }
}
