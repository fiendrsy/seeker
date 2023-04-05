import { Type } from "class-transformer";
import { IsArray, IsEnum, IsString, ValidateNested } from "class-validator";

export enum MenuCategory {
	Courses = "Courses",
	Services = "Services",
	Book = "Book",
	Products = "Products",
}

export class AdvantagesDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class TopPageDto {
	@IsEnum(MenuCategory)
	menuCategory: MenuCategory;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsArray()
	@Type(() => AdvantagesDto)
	@ValidateNested({ each: true })
	advantages: AdvantagesDto;

	@IsString()
	seoText: string;

	@IsArray()
	@IsString({ each: true })
	tagsTitle: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
