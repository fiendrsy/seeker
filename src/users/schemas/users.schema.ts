import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({ unique: true, required: true })
	login: string;

	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop({ type: () => [String], required: true })
	roles: string[];

	@Prop({ default: null, required: false })
	refreshTokenHash?: string;

	@Prop({ default: null, required: false })
	image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
