import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from "@nestjs/common";
import { Roles } from "../decorators";
import { JwtAccessTokenGuard, RolesGuard } from "../guards";
import { IdValidationPipe } from "../pipes";
import { ReviewService } from "./review.service";
import { ReviewDto } from "./dto";

@UseGuards(JwtAccessTokenGuard)
@Controller("review")
export class ReviewController {
	constructor(private reviewService: ReviewService) {}

	@Post("create")
	@UsePipes(ValidationPipe)
	async create(@Body() dto: ReviewDto) {
		return await this.reviewService.create(dto);
	}

	@Delete(":reviewId")
	async deleteReview(@Param("reviewId", IdValidationPipe) reviewId: string) {
		return await this.reviewService.deleteReview(reviewId);
	}

	@Roles("admin")
	@UseGuards(RolesGuard)
	@Delete("remove-all/:productId")
	async deleteAllReviewByProductId(
		@Param("productId", IdValidationPipe) productId: string,
	) {
		return await this.reviewService.deleteAllReviewByProductId(productId);
	}

	@Roles("admin")
	@UseGuards(RolesGuard)
	@Get("find-all/:productId")
	async findAllReviewByProductId(
		@Param("productId", IdValidationPipe) productId: string,
	) {
		return await this.reviewService.findAllReviewByProductId(productId);
	}
}
