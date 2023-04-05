import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { IdValidationPipe } from "../pipes";
import { Roles } from "../decorators";
import { RolesGuard } from "../guards";
import { FindPageDto, TopPageDto } from "./dto";
import { TopPageService } from "./top-page.service";

@Roles("admin")
@UseGuards(RolesGuard)
@Controller("top-page")
export class TopPageController {
	constructor(private topPageService: TopPageService) {}

	@Post("create")
	@UsePipes(ValidationPipe)
	async create(@Body() dto: TopPageDto) {
		return await this.topPageService.create(dto);
	}

	@Get(":topPageId")
	async getTopPage(@Param("topPageId", IdValidationPipe) topPageId: string) {
		return await this.topPageService.getTopPage(topPageId);
	}

	@Delete(":topPageId")
	async deleteTopPage(@Param("topPageId", IdValidationPipe) topPageId: string) {
		return await this.topPageService.deleteTopPage(topPageId);
	}

	@Patch(":topPageId")
	@UsePipes(ValidationPipe)
	async updateTopPage(
		@Param("topPageId", IdValidationPipe) topPageId: string,
		@Body() dto: TopPageDto,
	) {
		return await this.topPageService.updateTopPage(topPageId, dto);
	}

	@Roles("user")
	@UseGuards(RolesGuard)
	@Post("find-by-category")
	@UsePipes(ValidationPipe)
	@HttpCode(200)
	async findByCategory(@Body() dto: FindPageDto) {
		return await this.topPageService.findByCategory(dto);
	}

	@Roles("user")
	@UseGuards(RolesGuard)
	@Get("search-string/:value")
	async searchString(@Param("value") value: string) {
		return await this.topPageService.searchString(value);
	}
}
