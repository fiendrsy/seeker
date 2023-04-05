import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { NOT_FOUND } from "../app.constants";
import { Review, ReviewDocument } from "./schemas";
import { DeleteResult } from "./interface";
import { ReviewDto } from "./dto";

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name)
		private reviewModel: Model<ReviewDocument>,
	) {}

	public async create(dto: ReviewDto): Promise<ReviewDocument> {
		return await this.reviewModel.create(dto);
	}

	public async findAllReviewByProductId(
		productId: string,
	): Promise<ReviewDocument[]> {
		const reviews = await this.reviewModel.find({ productId }).exec();
		if (!reviews.length) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return reviews;
	}

	public async deleteReview(reviewId: string): Promise<ReviewDocument> {
		const delReview = await this.reviewModel
			.findOneAndDelete({ reviewId })
			.exec();
		if (!delReview) {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return delReview;
	}

	public async deleteAllReviewByProductId(
		productId: string,
	): Promise<DeleteResult> {
		const delReviews = await this.reviewModel.deleteMany({ productId }).exec();
		return delReviews;
	}
}
