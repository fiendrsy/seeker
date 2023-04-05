import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { NOT_FOUND } from "../app.constants";
import { FindPageDto, TopPageDto } from "./dto";
import { TopPage, TopPageDocumet } from "./schemas";

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPage.name)
		private topPageModel: Model<TopPageDocumet>,
	) {}

	public async create(dto: TopPageDto): Promise<TopPage> {
		return await this.topPageModel.create(dto);
	}

	public async getTopPage(topPageId: string): Promise<TopPage> {
		const topPage = await this.topPageModel.findById(topPageId).exec();
		if (!topPage) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return topPage;
	}

	public async deleteTopPage(topPageId: string): Promise<TopPage> {
		const delPage = await this.topPageModel.findByIdAndDelete(topPageId).exec();
		if (!delPage) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return delPage;
	}

	public async updateTopPage(
		topPageId: string,
		dto: TopPageDto,
	): Promise<TopPage> {
		const updatedTopPage = await this.topPageModel
			.findByIdAndUpdate(topPageId, dto, { new: true })
			.exec();
		if (!updatedTopPage) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return updatedTopPage;
	}

	public async findByCategory(dto: FindPageDto): Promise<TopPage> {
		const foundPage = await this.topPageModel
			.findOne({ menuCategory: dto.menuCategory })
			.exec();
		if (!foundPage) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return foundPage;
	}

	public async searchString(value: string): Promise<TopPage[]> {
		const foundPage = await this.topPageModel
			.find({
				$text: { $search: value, $caseSensitive: false },
			})
			.exec();
		if (!foundPage.length) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return foundPage;
	}
}
