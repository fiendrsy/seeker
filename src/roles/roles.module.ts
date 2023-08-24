import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
