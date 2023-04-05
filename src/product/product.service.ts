import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ReviewService } from "../review/review.service";
import { NOT_FOUND } from "../app.constants";
import { ProductAggregateModel } from "./interface";
import { Product, ProductDocument } from "./schemas";
import { FindProductDto, ProductDto } from "./dto";

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name)
		private productModel: Model<ProductDocument>,
		private reviewService: ReviewService,
	) {}

	public async create(dto: ProductDto): Promise<Product> {
		return await this.productModel.create(dto);
	}

	public async deleteProduct(productId: string): Promise<Product> {
		await this.reviewService.deleteAllReviewByProductId(productId);
		return await this.productModel.findByIdAndDelete(productId).exec();
	}

	public async getProduct(productId: string): Promise<Product> {
		const product = await this.productModel.findById(productId).exec();
		if (!product) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return product;
	}

	public async updateProduct(
		productId: string,
		dto: ProductDto,
	): Promise<Product> {
		const updatedProduct = await this.productModel
			.findByIdAndUpdate(productId, dto, { new: true })
			.exec();
		if (!updatedProduct) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return updatedProduct;
	}

	public async findProduct(
		dto: FindProductDto,
	): Promise<ProductAggregateModel> {
		const product = await this.productModel
			.aggregate()
			.match({ categories: dto.category })
			.sort({ _id: 1 })
			.limit(dto.limit)
			.lookup({
				from: "reviews",
				let: { searchId: { $toString: "$_id" } },
				pipeline: [
					{ $match: { $expr: { $eq: ["$productId", "$$searchId"] } } },
				],
				as: "reviews",
			})
			.exec();
		if (!product.length) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return product;
	}
}
