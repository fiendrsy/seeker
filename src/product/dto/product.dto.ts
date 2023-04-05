import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductDto {
	@IsString()
	image: string;

	@IsString()
	title: string;

	@IsNumber()
	price: number;

	@IsNumber()
	oldPrice: number;

	@IsBoolean()
	credit: boolean;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disAdvantages: string;

	@IsArray()
	@IsString({ each: true })
	categories: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
