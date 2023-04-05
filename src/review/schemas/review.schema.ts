import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
	@Prop({ unique: false, required: true })
	productId: Types.ObjectId;

	@Prop({ required: true })
	login: string;

	@Prop({ required: true })
	text: string;

	@Prop({ required: true })
	rating: number;

	@Prop({
		default: () => new Date(),
		required: false,
	})
	createdAt?: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
