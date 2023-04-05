import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "../users/users.module";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { Review, ReviewSchema } from "./schemas/review.schema";

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: Review.name,
				useFactory: async () => ReviewSchema,
			},
		]),
		UsersModule,
		JwtModule,
	],
	controllers: [ReviewController],
	providers: [ReviewService],
	exports: [ReviewService, MongooseModule],
})
export class ReviewModule {}
