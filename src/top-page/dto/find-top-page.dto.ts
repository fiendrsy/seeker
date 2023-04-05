import { IsEnum } from "class-validator";
import { MenuCategory } from "./top-page.dto";

export class FindPageDto {
	@IsEnum(MenuCategory)
	menuCategory: MenuCategory;
}
