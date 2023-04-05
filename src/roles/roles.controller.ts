import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { Roles } from "../decorators";
import { RolesGuard } from "../guards";
import { IdValidationPipe } from "../pipes";
import { UserProfile } from "../users/interface";
import { RolesService } from "./roles.service";
import { SetRolesDto } from "./dto";

@Roles("admin")
@UseGuards(RolesGuard)
@Controller("roles")
export class RolesController {
	constructor(private rolesService: RolesService) {}

	@Patch("set/:userId")
	@HttpCode(200)
	@UsePipes(ValidationPipe)
	async setRole(
		@Body() dto: SetRolesDto,
		@Param("userId", IdValidationPipe) userId: string,
	): Promise<UserProfile> {
		return await this.rolesService.setRole(userId, dto);
	}

	@Patch("remove/:userId")
	@HttpCode(200)
	@UsePipes(ValidationPipe)
	async removeRole(
		@Body() dto: SetRolesDto,
		@Param("userId", IdValidationPipe) userId: string,
	): Promise<UserProfile> {
		return await this.rolesService.removeRole(userId, dto);
	}

	@Get("find-by-role/:role")
	async findByRole(@Param("role") role: string) {
		return await this.rolesService.findByRole(role);
	}
}
